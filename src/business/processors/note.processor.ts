import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';

import { QueueTokens } from 'src/infra/queue/tokens';
import { PatientRepository } from '../repositories/patient.repository';
import { OpenAiService } from '../services/OpenAiService';

@Processor(QueueTokens.NoteToken)
export class NoteProcessor {
  private readonly logger = new Logger('NoteProcessor');
  constructor(
    private readonly patientRepository: PatientRepository,
    private readonly openaiService: OpenAiService, // Assuming OpenAIService is defined and injected
  ) {}

  @Process('process-audio-section-g')
  async sessionCompleted(job: Job<{ noteId: string }>) {
    try {
      console.log(`Processing job for note ID: ${job.data.noteId}`);
      const note = await this.patientRepository.findNoteById(job.data.noteId);
      if (!note) return null;

      this.logger.log(
        `Processing audio section for note ID: ${job.data.noteId}`,
      );

      const transcription = await this.openaiService.transcribeAudio(
        note.audio_url,
        'whisper-1',
      );

      if (!transcription) {
        this.logger.warn(
          `No transcription returned for note ID: ${job.data.noteId}`,
        );
        return null;
      }

      await this.patientRepository.updateProcessedNote(
        job.data.noteId,
        transcription,
      );

      const sectionG = await this.openaiService.generateSectionG(transcription);

      console.log(`Section G for note ID ${job.data.noteId}: ${sectionG}`);

      await this.patientRepository.addSectionG(job.data.noteId, sectionG);

      console.log(
        `Transcription for note ID ${job.data.noteId}: ${transcription}`,
      );
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}

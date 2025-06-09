import { getQueueToken } from '@nestjs/bull';
import { Inject, Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { PatientRepository } from 'src/business/repositories/patient.repository';
import { S3ClientService } from 'src/business/services/BucketService';
import { QueueTokens } from 'src/infra/queue/tokens';

@Injectable()
export class PatientService {
  constructor(
    private readonly patient: PatientRepository,
    private readonly s3ClientService: S3ClientService,

    @Inject(getQueueToken(QueueTokens.NoteToken))
    private readonly noteQueue: Queue,
  ) {}

  async patientAddNote(patient_id: string, file: Express.Multer.File) {
    try {
      if (!patient_id || !file) {
        throw new Error('Patient ID and file are required');
      }

      if (!file.mimetype.includes('audio')) {
        throw new Error('Invalid file type. Only audio files are allowed.');
      }

      const uploadedFileUrl = await this.s3ClientService.saveFileToS3(
        process.env.AWS_BUCKET_NAME ?? '',
        Date.now() + '-' + file.originalname,
        file.buffer,
      );

      const createdNote = await this.patient.addNoteAudioUnprocessed(
        patient_id,
        uploadedFileUrl,
      );

      const job = await this.noteQueue.add(
        'process-audio-section-g',
        {
          noteId: createdNote.id,
        },
        {
          jobId: createdNote.id,
        },
      );

      console.log(`Job added to queue with ID: ${job.id}`);

      console.log('Note created successfully:', createdNote);
      // PROCESS THE AUDIO FILE
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getPatients() {
    try {
      const patients = await this.patient.getPatients();
      return patients;
    } catch (error) {
      console.error('Error fetching patients:', error);
      throw error;
    }
  }

  async getPatientNotes(patient_id: string) {
    try {
      if (!patient_id) {
        throw new Error('Patient ID is required');
      }

      const notes = await this.patient.getPatientNotes(patient_id);
      return notes;
    } catch (error) {
      console.error('Error fetching patient notes:', error);
      throw error;
    }
  }
}

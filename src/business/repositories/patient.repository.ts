import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../infra/database/prisma.service';
@Injectable()
export class PatientRepository {
  private readonly logger = new Logger('PatientRepository');
  constructor(private readonly prisma: PrismaService) {}

  async addNoteAudioUnprocessed(patient_id: string, audio_url: string) {
    try {
      const patientNote = await this.prisma.note.create({
        data: {
          patient_id: patient_id,
          audio_url,
          status: 'unprocessed',
        },
      });

      return patientNote;
    } catch (error) {
      this.logger.error('Error adding note audio unprocessed', error);
      throw error;
    }
  }

  async updateProcessedNote(noteId: string, transcription: string) {
    try {
      const updatedNote = await this.prisma.note.update({
        where: { id: noteId },
        data: {
          transcription,
          summary: transcription,
          status: 'processed',
        },
      });

      return updatedNote;
    } catch (error) {
      this.logger.error(`Error updating processed note ${noteId}`, error);
      throw error;
    }
  }

  async addSectionG(noteId: string, sectionG: string | null) {
    try {
      const updatedNote = await this.prisma.sectionG.create({
        data: {
          note_id: noteId,
          payload: sectionG ?? undefined,
        },
      });

      return updatedNote;
    } catch (error) {
      this.logger.error(`Error adding Section G to note ${noteId}`, error);
      throw error;
    }
  }

  async findNoteById(noteId: string) {
    try {
      const note = await this.prisma.note.findUnique({
        where: { id: noteId },
      });
      return note;
    } catch (error) {
      this.logger.error(`Error finding note by ID ${noteId}`, error);
      throw error;
    }
  }

  async getPatients() {
    try {
      const patients = await this.prisma.patient.findMany();
      return patients;
    } catch (error) {
      this.logger.error('Error fetching patients', error);
      throw error;
    }
  }

  getPatientNotes(patient_id: string) {
    try {
      const notes = this.prisma.note.findMany({
        where: { patient_id },
        include: {
          section_g: true,
        },
      });
      return notes;
    } catch (error) {
      this.logger.error(
        `Error fetching notes for patient ${patient_id}`,
        error,
      );
      throw error;
    }
  }
}

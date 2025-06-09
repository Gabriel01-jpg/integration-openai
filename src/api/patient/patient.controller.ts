import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { PatientService } from './patient.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('patient')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Post('/secion-g/note')
  @UseInterceptors(FileInterceptor('audio_file'))
  async note(
    @Body('patient_id') patient_id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.patientService.patientAddNote(patient_id, file);
  }

  @Get('')
  async getPatients() {
    return this.patientService.getPatients();
  }

  @Get('/:patient_id/notes')
  async getPatientNotes(@Param('patient_id') patient_id: string) {
    return this.patientService.getPatientNotes(patient_id);
  }
}

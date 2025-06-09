-- CreateTable
CREATE TABLE "patients" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "mrn" TEXT NOT NULL,
    "date_of_birth" DATE NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "patients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "note" (
    "id" UUID NOT NULL,
    "patient_id" UUID NOT NULL,
    "audio_url" TEXT NOT NULL,
    "transcription" TEXT,
    "summary" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "note_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sectiong" (
    "id" UUID NOT NULL,
    "note_id" UUID NOT NULL,
    "m1800_grooming" INTEGER,
    "m1810_upper_body_dressing" INTEGER,
    "m1820_lower_body_dressing" INTEGER,
    "m1830_bathing" INTEGER,
    "m1840_toilet_transfer" INTEGER,
    "m1850_toilet_hygiene" INTEGER,
    "m1860_ambulation" INTEGER,
    "payload" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sectiong_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "patients_mrn_key" ON "patients"("mrn");

-- CreateIndex
CREATE UNIQUE INDEX "sectiong_note_id_key" ON "sectiong"("note_id");

-- AddForeignKey
ALTER TABLE "note" ADD CONSTRAINT "note_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "patients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sectiong" ADD CONSTRAINT "sectiong_note_id_fkey" FOREIGN KEY ("note_id") REFERENCES "note"("id") ON DELETE CASCADE ON UPDATE CASCADE;

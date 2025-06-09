/*
  Warnings:

  - You are about to drop the column `m1800_grooming` on the `sectiong` table. All the data in the column will be lost.
  - You are about to drop the column `m1810_upper_body_dressing` on the `sectiong` table. All the data in the column will be lost.
  - You are about to drop the column `m1820_lower_body_dressing` on the `sectiong` table. All the data in the column will be lost.
  - You are about to drop the column `m1830_bathing` on the `sectiong` table. All the data in the column will be lost.
  - You are about to drop the column `m1840_toilet_transfer` on the `sectiong` table. All the data in the column will be lost.
  - You are about to drop the column `m1850_toilet_hygiene` on the `sectiong` table. All the data in the column will be lost.
  - You are about to drop the column `m1860_ambulation` on the `sectiong` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "sectiong" DROP COLUMN "m1800_grooming",
DROP COLUMN "m1810_upper_body_dressing",
DROP COLUMN "m1820_lower_body_dressing",
DROP COLUMN "m1830_bathing",
DROP COLUMN "m1840_toilet_transfer",
DROP COLUMN "m1850_toilet_hygiene",
DROP COLUMN "m1860_ambulation";

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const patients = [
    {
      name: 'John Doe',
      date_of_birth: new Date('1980-01-01'),
      mrn: 'MRN123456',
    },
    {
      name: 'John Doe',
      date_of_birth: new Date('1980-01-01'),
      mrn: 'MRN654321',
    },
  ];

  await prisma.patient.createMany({
    data: patients,
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

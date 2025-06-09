#!/bin/sh

echo "Running Prisma generate..."
npx prisma generate

echo "Running Prisma migrations..."
npx prisma migrate deploy

echo "Seeding database..."
npx prisma db seed

echo "Starting server..."
exec node dist/src/main.js

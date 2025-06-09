HealthOASIS – AI-Powered Scribe Backend

This project is a backend for an AI-powered scribe application that performs real-time audio transcription and analysis for Home Health OASIS assessments (Section G).

Getting Started
Prerequisites:

- Docker
- Docker Compose

git clone https://github.com/your-username/integration-openai
cd health-oasis

#Necessary populate informations about AWS and OPENAI API key on docker-compose env fields

docker-compose up --build

This will:

Start PostgreSQL and Redis containers

Build the Node.js app

Run Prisma migrations

Seed the database

Start the backend server

Access the app

App: http://localhost:3000

Database: available internally to the containers as postgres://admin:admin@database:5432/healthoasis

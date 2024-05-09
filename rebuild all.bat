@echo off

docker-compose down
docker-compose up --build
docker-compose exec backend node src/seed.js

cd backend
npm run seed
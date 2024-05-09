@echo off

REM Step 1: Stop only the backend container
docker-compose stop backend

REM Step 2: Remove the existing image
docker rmi backend

REM Step 3: Rebuild the image and start the container
docker-compose up --build
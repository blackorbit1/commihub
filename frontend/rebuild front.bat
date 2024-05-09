@echo off

REM Step 1: Stop the running container
docker-compose down

REM Step 2: Remove the existing image
docker rmi frontend

REM Step 3: Rebuild the image and start the container
docker-compose up --build
#!/bin/bash

echo "Cleaning..."
rm -rf build

npm set //npm.pkg.github.com/:_authToken=$2

echo "Upgrade NPM..."
npm install -g npm@latest
echo "npm install"
npm install || exit 1
echo "npm run build"
CI=false npm run build || exit 1

echo "$2" | docker login docker.pkg.github.com -u "$1" --password-stdin

IMAGE_NAME=bingo-tournament-fe
IMAGE_ID=docker.pkg.github.com/xwmtp/bingo2022/$IMAGE_NAME

docker build . --tag $IMAGE_NAME
docker tag $IMAGE_NAME $IMAGE_ID:latest
docker push $IMAGE_ID:latest

docker logout

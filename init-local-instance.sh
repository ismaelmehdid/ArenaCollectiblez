#!/usr/bin/env bash

set -e # Exit on error

#===----------------------------------------------------------------------===#
# Running the local postgres db via docker
#===----------------------------------------------------------------------===#

CONTAINER_NAME="arena-collectiblez-postgres"

if [ "$(docker ps -aq -f name=^/${CONTAINER_NAME}$)" ]; then
  echo "⏹ Stopping and removing the old container ${CONTAINER_NAME}..."
  docker rm -f "${CONTAINER_NAME}"
else
  echo "ℹ️  No container ${CONTAINER_NAME} running, we can start directly."
fi

docker volume create pgdata >/dev/null

echo "🚀 Running ${CONTAINER_NAME}..."
docker run -d \
  --name "${CONTAINER_NAME}" \
  --env-file .env \
  -p 5432:5432 \
  -v pgdata:/var/lib/postgresql/data \
  --restart always \
  postgres:15

echo "✅ Container ${CONTAINER_NAME} started."

#===----------------------------------------------------------------------===#
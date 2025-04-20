#!/bin/bash

echo "🧹 清理現有容器和映像檔..."
docker-compose down --volumes
docker image rm sportify-backend

echo "🔁 使用 --no-cache 重新建構..."
docker-compose build --no-cache

echo "🚀 啟動服務並強制重建容器..."
docker-compose up --force-recreate

# 使用官方 Node.js 映像
FROM node:20

# 設定容器內的工作目錄
WORKDIR /app

# 複製 package.json 和 package-lock.json（有的話）
COPY package*.json ./

# 安裝 npm 套件
RUN npm install

# 複製所有程式碼進容器
COPY . .

# 暴露應用的 port（從 .env 拿的 PORT 應該是 3000）
EXPOSE 3000

# 設定啟動指令
CMD ["npm", "start"]

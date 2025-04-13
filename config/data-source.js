// src/config/data-source.js
const { DataSource } = require("typeorm");
require("dotenv").config();

const User = require("../entities/User");
const Coach = require("../entities/Coach");

const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  synchronize: true, // 開發用，自動建立資料表（正式環境建議 false）
  logging: true,
  entities: [
    User,
    Coach
  ],
  migrations: [],
  subscribers: [],
});

module.exports = AppDataSource;

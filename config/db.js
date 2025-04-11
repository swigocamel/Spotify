// src/config/db.js
const AppDataSource = require("./data-source");

const connectDB = async () => {
  try {
    await AppDataSource.initialize();
    console.log("✅ 資料庫連線成功！");
  } catch (err) {
    console.error("❌ 資料庫連線失敗：", err);
  }
};

module.exports = connectDB;

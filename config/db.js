// src/config/db.js
const AppDataSource = require("./data-source");

const connectDB = async (retry = 5) => {
    while (retry > 0) {
      try {
        await AppDataSource.initialize();
        console.log("✅ 資料庫連線成功！");
        break;
      } catch (err) {
        console.error("❌ 資料庫連線失敗，重試中...", err.message);
        retry--;
        await new Promise((res) => setTimeout(res, 3000));
      }
    }
  
    if (retry === 0) {
      console.error("⛔ 無法連線至資料庫，請檢查設定");
      process.exit(1);
    }
  };
  

module.exports = connectDB;

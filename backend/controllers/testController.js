// 引入資料庫設定
const AppDataSource = require("../db/data-source");

// 引入你定義好的資料表 Entity
const User = require("../entities/User");
const Coach = require("../entities/Coach");

// 建立一個對應關係：key 為網址參數中可能帶入的資料表名稱，value 是對應的 Entity
// 這樣可以避免使用者隨便亂打不存在的表
const tableMap = {
    user: User,
    coach: Coach,
};

const testController = {
    // 建立一個動態查詢 function
    // 它會根據網址參數 `table` 決定要查哪一張表
    async getAllFromTable(req, res) {
        const { table } = req.params; // 取得網址上的參數，例如 /test/user 就會是 user

        // 從我們定義好的 tableMap 中找出對應的 Entity
        const entity = tableMap[table.toLowerCase()];
        if (!entity) {
            // 如果 tableMap 裡找不到對應的 entity，回傳錯誤
            return res.status(400).json({
                status: false,
                message: "資料表 ${table} 不存在或尚未設定在 testController",
            });
        }

        // 如果有對應的 entity，就用 TypeORM 的 repository 去查資料
        const repo = AppDataSource.getRepository(entity);
        try {
            // 查詢資料表中所有資料
            const records = await repo.find();

            // 成功查詢後回傳資料
            res.status(200).json({
                status: true,
                data: {
                    table,     // 回傳目前查詢的是哪個資料表
                    records,   // 回傳查詢到的資料陣列
                }
            });
        } catch (error) {
            // 若在查詢時發生錯誤（例如資料庫連線失敗）
            console.error("資料查詢失敗：", error);
            res.status(500).json({
                status: false,
                message: "資料查詢失敗，請稍後再試",
            });
        }
    }
};

// 匯出 controller 讓其他檔案可以使用
module.exports = testController;

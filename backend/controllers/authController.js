// src/controllers/authController.js

// 引入必要的依賴
const AppDataSource = require("../db/data-source"); // 資料庫資料來源
const { IsValidString, IsValidEmail, IsValidPassword, getEntityName, pluralToEntityMap } = require("../utils/validation"); // 輸入驗證和獲取實體名稱的工具函式
const bcrypt = require("bcrypt"); // 加密密碼
const { generateJWT } = require("../utils/jwtUtils"); // 用來生成 JWT token
const saltRounds = 10; // bcrypt 加密時的 salt rounds 設定

// 定義各身份類型的欄位配置
const typeData = {
    users: {
        requiredFields: ["name", "email", "password"], // 使用者註冊時需要的欄位
        returnFields: ["id", "name", "email"], // 登錄後回傳的欄位
    },
    coaches: {
        requiredFields: [
            "realname", "nickname", "email", "password", "job_title", "skill",
            "skill_description", "experience_years", "experience", "license_url",
            "about_me", "id_number", "profile_image_url", "background_image_url",
            "bankbook_copy_url", "phone_number", "birthday"
        ], // 教練註冊時需要的欄位
        returnFields: [
            "id", "realname", "nickname", "email", "job_title", "skill",
            "skill_description", "experience_years", "experience", "license_url",
            "about_me", "id_number", "profile_image_url", "background_image_url",
            "bankbook_copy_url", "phone_number", "birthday"
        ], // 登錄後回傳的欄位
    }
};

// 定義認證控制器
const authController = {
    // 註冊功能
    async postSignUp(req, res) {
        // 從 URL 路徑取得身份類型（user 或 coach）
        const { type } = req.params;

        // 根據 type 取得對應的配置
        const getType = typeData[type];
        // 根據 type 取得對應的實體名稱
        const entityName = getEntityName(type);

        // 檢查是否有有效的類型配置或實體名稱
        if (!getType || !entityName) {
            return res.status(400).json({ status: false, message: "無效的類型參數" });
        }

        // 嘗試載入對應的 Entity（實體類型）
        let Entity;
        try {
            Entity = require(`../entities/${entityName}`);
        } catch (error) {
            // 如果實體不存在，返回錯誤
            return res.status(400).json({ status: false, message: "找不到指定的資料表" });
        }

        // 從資料庫中取得該 Entity 的 repository
        const repo = AppDataSource.getRepository(Entity);
        // 從請求中取得用戶提交的資料
        const data = req.body;

        // 驗證 email 和 password 欄位是否正確
        if (!IsValidString(data.email) || !IsValidEmail(data.email) || !IsValidString(data.password)) {
            return res.status(400).json({ status: false, message: "欄位未填寫正確" });
        }

        // 驗證密碼是否符合規則
        if (!IsValidPassword(data.password)) {
            return res.status(400).json({
                status: false,
                message: "密碼不符合規則，需要包含英文數字大小寫，最短8個字，最長16個字"
            });
        }

        // 檢查是否已經有相同的 Email
        const existing = await repo.findOne({ where: { email: data.email } });
        if (existing) {
            return res.status(409).json({ status: false, message: "Email已被使用" });
        }

        // 加密密碼並創建實體資料
        const hashedPassword = await bcrypt.hash(data.password, saltRounds);
        const entity = repo.create({ ...data, password: hashedPassword }); //...data：這是 展開運算子（spread operator），把 req.body 裡面的欄位逐一展開成物件的屬性
        // 保存實體資料到資料庫
        await repo.save(entity);

        // 只返回指定的欄位資料
        const returnData = {};
        // config.returnFields：這是一個陣列，裡面列出你想回傳的欄位名稱，例如：
        // ["id", "email", "name"]
        // .forEach(...)：這是陣列的迴圈方法，會針對 returnFields 裡的每個欄位名稱（也就是 key）執行裡面的動作。
        // returnData[key] = entity[key]：從資料物件 entity 裡面取出對應欄位的值，存到 returnData 裡。
        getType.returnFields.forEach(key => returnData[key] = entity[key]);

        // 回傳成功的回應
        res.status(201).json({
            status: true,
            data: {
                [pluralToEntityMap[type].toLowerCase()]: returnData // pluralToEntityMap[type].toLowerCase()：這是把 type 轉成小寫的名稱，例如 "user" 或 "coach"
            }
        });
    },

    // 登錄功能
    async postLogin(req, res) {
        // 從 URL 路徑取得身份類型（user 或 coach）
        const { type } = req.params;

        // 根據 type 取得對應的配置
        const config = typeData[type];
        // 根據 type 取得對應的實體名稱
        const entityName = getEntityName(type);

        // 檢查是否有有效的類型配置或實體名稱
        if (!config || !entityName) {
            return res.status(400).json({ status: false, message: "無效的類型參數" });
        }

        // 嘗試載入對應的 Entity（實體類型）
        let Entity;
        try {
            Entity = require(`../entities/${entityName}`);
        } catch (error) {
            return res.status(400).json({ status: false, message: "找不到指定的資料表" });
        }

        // 從資料庫中取得該 Entity 的 repository
        const repo = AppDataSource.getRepository(Entity);
        // 從請求中取得 email 和 password
        const { email, password } = req.body;

        // 驗證 email 和 password 欄位是否正確
        if (!IsValidString(email) || !IsValidEmail(email) || !IsValidString(password)) {
            return res.status(400).json({ status: false, message: "欄位未填寫正確" });
        }

        // 查詢是否有該用戶資料
        const entity = await repo.findOne({ where: { email } });

        // 如果找不到用戶資料或密碼錯誤，返回錯誤
        if (!entity || !await bcrypt.compare(password, entity.password)) {
            return res.status(401).json({ status: false, message: "帳號或密碼錯誤" });
        }

        // 嘗試使用最適合的名稱欄位
        const name = entity.name || entity.nickname || entity.realname;

        // 創建 JWT token，並設置過期時間為 3 天
        const token = generateJWT({
            id: entity.id,
            email: entity.email,
            name: name
        });

        // 只返回指定的欄位資料
        const returnData = {};
        config.returnFields.forEach(key => returnData[key] = entity[key]);

        // 回傳成功的回應，包含 token 和用戶資料
        res.status(200).json({
            status: true,
            data: {
                token,
                [pluralToEntityMap[type].toLowerCase()]: returnData // pluralToEntityMap[type].toLowerCase()：這是把 type 轉成小寫的名稱，例如 "user" 或 "coach"
            }
        });
    }
};

// 匯出控制器
module.exports = authController;

// src/utils/validation.js
// 檢查字串是否有效
const IsValidString = (str) => {
    return typeof str === 'string' && str.trim().length > 0;
  };
  
// 檢查是否為有效的電子郵件格式
const IsValidEmail = (email) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
  };
  
// 更新密碼檢查：至少包含一個大寫字母、一個小寫字母、一個數字，並且長度在 8 到 16 字之間
const IsValidPassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,16}$/;
    return regex.test(password);
  };
  
// 定義一個映射表，將常見的不規則複數形式對應到單數形式
const pluralToEntityMap = {
  users: "User",        // 複數 users -> 單數 User
  coaches: "Coach",      // 複數 coaches -> 單數 Coach
};

const getEntityName = (type) => {
    // 如果沒有傳入 type，或者 type 不是字串，就回傳 null（無效輸入）
    if (!type || typeof type !== "string") return null;

    // 嘗試從映射表中找到對應的單數形式
    const entityName = pluralToEntityMap[type.toLowerCase()];

    // 如果找到對應的單數形式，就返回它；如果沒找到，就自行處理常規複數（移除最後一個字母 's'）
    if (entityName) {
        return entityName;
    } else {
        const singular = type.endsWith("s") ? type.slice(0, -1) : type;
        // 把第一個字母轉大寫，其他保持不變，組合成 Entity 名稱
        return singular.charAt(0).toUpperCase() + singular.slice(1);
    }
};

module.exports = {
    IsValidString,
    IsValidEmail,
    IsValidPassword,
    getEntityName,
    pluralToEntityMap,
  };
  
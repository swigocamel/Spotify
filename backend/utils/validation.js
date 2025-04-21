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
  
module.exports = {
    IsValidString,
    IsValidEmail,
    IsValidPassword,
  };
  
// src/controllers/userController.js
const AppDataSource = require("../config/data-source");
const User = require("../entities/User");
const { IsValidString, IsValidEmail, IsValidPassword } = require("../utils/validation");

exports.postSignUp = async (req, res) => {
    // 從body取得資料並存入資料庫user schema 然後回傳201
    const { name, email, password } = req.body;

    try {
      console.log('IsValidString(name)', IsValidString(name));
      console.log('IsValidString(email)', IsValidString(email));
      console.log('IsValidString(password)', IsValidString(password));
      console.log('IsValidEmail(email)', IsValidEmail(email));
      console.log('isValidPassword(password)', IsValidPassword(password));
      // check valid string and email
      if (!IsValidString(name) || !IsValidString(email) || !IsValidEmail(email) || !IsValidString(password)) {
        return res.status(400).json({
          status: 'failed',
          message: '欄位未填寫正確',
        });
      }
      
      // check valid password
      if (!IsValidPassword(password)) {
        return res.status(400).json({
          status: 'failed',
          message: '密碼不符合規則，需要包含英文數字大小寫，最短8個字，最長16個字',
        });
      }

      const userRepo = AppDataSource.getRepository(User);

      // check if email already exists
      const getUser = await userRepo.findOne({ where: { email } });
      if (getUser) {
        return res.status(409).json({
          status: 'failed',
          message: 'Email已被使用',
        });
      }

      const user = userRepo.create({ name, email, password });
      await userRepo.save(user);
    
      res.status(201).json({
        status: 'success',
        data: {
          user:{
            id: user.id,
            name: user.name,
            email: user.email
          }
        }, 
     });
    } 
    catch (error) {
      res.status(500).json({
        status: 'error',
        message: '伺服器錯誤',
        error: error.message,
     });
    }
  };

  
// src/controllers/userController.js
const AppDataSource = require("../config/data-source");
const User = require("../entities/User");
const { IsValidString, IsValidEmail, IsValidPassword } = require("../utils/validation");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const userController = {
    async postSignUp (req, res, next) {
        // 從body取得資料並存入資料庫user schema 然後回傳201
        const { name, email, password } = req.body;

        // check valid string and email
        if (!IsValidString(name) || !IsValidString(email) || !IsValidEmail(email) || !IsValidString(password)) {
        return res.status(400).json({
            status: false,
            message: '欄位未填寫正確',
        });
        }
        
        // check valid password
        if (!IsValidPassword(password)) {
        return res.status(400).json({
            status: false,
            message: '密碼不符合規則，需要包含英文數字大小寫，最短8個字，最長16個字',
        });
        }

        const userRepo = AppDataSource.getRepository(User);

        // check if email already exists
        const getUser = await userRepo.findOne({ where: { email } });
        if (getUser) {
        return res.status(409).json({
            status: false,
            message: 'Email已被使用',
        });
        }

        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const user = userRepo.create({ name, email, password: hashedPassword });
        await userRepo.save(user);

        res.status(201).json({
            status: true,
            data: {
                user:{
                id: user.id,
                name: user.name,
                email: user.email
                }
            }, 
        });
    }
}

module.exports = userController;

  
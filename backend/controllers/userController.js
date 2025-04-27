// src/controllers/userController.js
const AppDataSource = require("../db/data-source");
const User = require("../entities/User");

const userController = {
    async getUserList (req, res, next) {
        // get all user list from User schema
        const userRepo = AppDataSource.getRepository(User);
        const users = await userRepo.find();
        const userList = users.map(user => ({
            id: user.id,
            name: user.name,
            email: user.email,
            created_at: user.created_at,
            updated_at: user.updated_at
        }))

        // return data result
        res.status(200).json({
            status: true,
            data: {
                userList
            }
        })
    },

    async getUserProfile (req, res, next) {
        const userRepo = AppDataSource.getRepository(User);
        const user = await userRepo.findOne({ where: { id: req.user.id } });

        if (!user) {
            return res.status(400).json({
                status: false,
                message: '使用者不存在'
            })
        }

        res.status(200).json({
            status: true,
            data: {
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email
                }
            }
        })
    }
}

module.exports = userController;

  
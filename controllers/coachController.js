// src/controllers/coachController.js
const AppDataSource = require("../config/data-source");
const Coach = require("../entities/Coach");
const { IsValidString, IsValidEmail, IsValidPassword } = require("../utils/validation");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const coachController = {
    async postSignUp (req, res, next) {
        // 從body取得資料並存入資料庫coach schema 然後回傳201
        const { realname, email, password, nickname, job_title, skill, skill_description, 
                experience_years, experience, license_url, about_me, id_number,
                profile_image_url, background_image_url, bankbook_copy_url,
                phone_number, birthday } = req.body;

        // check valid string and email
        if (!IsValidString(realname) || !IsValidString(email) || !IsValidEmail(email) || !IsValidString(password) ||
            !IsValidString(nickname) || !IsValidString(job_title) || !IsValidString(skill) || 
            !IsValidString(skill_description) || !IsValidString(experience_years) || !IsValidString(experience) ||
            !IsValidString(license_url) || !IsValidString(about_me) || !IsValidString(id_number) ||
            !IsValidString(profile_image_url) || !IsValidString(background_image_url) || 
            !IsValidString(bankbook_copy_url) || !IsValidString(phone_number) || !IsValidString(birthday)) {
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

        const coachRepo = AppDataSource.getRepository(Coach);

        // check if email already exists
        const getCoach = await coachRepo.findOne({ where: { email } });
        if (getCoach) {
            return res.status(409).json({
                status: false,
                message: 'Email已被使用',
        });
        }

        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const coach = coachRepo.create({ realname, email, nickname, job_title, skill, skill_description,
            experience_years, experience, license_url, about_me, id_number,
            profile_image_url, background_image_url, bankbook_copy_url,
            phone_number, birthday, password: hashedPassword });
        await coachRepo.save(coach);

        res.status(201).json({
            status: true,
            data: {
                coach:{
                id: coach.id,
                realname: coach.realname,
                email: coach.email,
                nickname: coach.nickname,
                job_title: coach.job_title,
                skill: coach.skill,
                skill_description: coach.skill_description,
                experience_years: coach.experience_years,
                experience: coach.experience,
                license_url: coach.license_url,
                about_me: coach.about_me,
                id_number: coach.id_number,
                profile_image_url: coach.profile_image_url,
                background_image_url: coach.background_image_url,
                bankbook_copy_url: coach.bankbook_copy_url,
                phone_number: coach.phone_number,
                birthday: coach.birthday
                }
            }, 
        });
    },

    async getCoachList (req, res, next) {
        // get all coach list from Coach schema
        const coachRepo = AppDataSource.getRepository(Coach);
        const coaches = await coachRepo.find();
        const coachList = coaches.map(coach => ({
            id: coach.id,
            realname: coach.realname,
            email: coach.email,
            nickname: coach.nickname,
            job_title: coach.job_title,
            skill: coach.skill,
            skill_description: coach.skill_description,
            experience_years: coach.experience_years,
            experience: coach.experience,
            license_url: coach.license_url,
            about_me: coach.about_me,
            id_number: coach.id_number,
            profile_image_url: coach.profile_image_url,
            background_image_url: coach.background_image_url,
            bankbook_copy_url: coach.bankbook_copy_url,
            phone_number: coach.phone_number,
            birthday: coach.birthday,
            created_at: coach.created_at,
            updated_at: coach.updated_at
        }))

        // return data result
        res.status(200).json({
            status: true,
            data: {
                coachList
            }
        })
    }
}

module.exports = coachController;

  
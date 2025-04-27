// src/controllers/coachController.js
const AppDataSource = require("../db/data-source");
const Coach = require("../entities/Coach");

const coachController = {
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
    },

    async getCoachProfile (req, res, next) {
        const coachRepo = AppDataSource.getRepository(Coach);
        const coach = await coachRepo.findOne({ where: { id: req.user.id } });

        if (!coach) {
            return res.status(400).json({
                status: false,
                message: '使用者不存在'
            })
        }

        res.status(200).json({
            status: true,
            data: {
                coach: {
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
                }
            }
        })
    }
}

module.exports = coachController;

  
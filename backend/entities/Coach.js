// src/entities/Coach.js
const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: 'COACH',
    tableName: 'coaches',
    columns: {
        id: {
            primary: true,
            type: "uuid",
            generated: "uuid"
        },
        nickname: {
            type: "varchar",
            length: 50,
            nullable: false
        },
        realname: {
            type: "varchar",
            length: 50,
            nullable: false
        },
        job_title: {
            type: "varchar",
            length: 20,
            nullable: false
        },
        skill: {
            type: "varchar",
            length: 20,
            nullable: false
        },
        skill_description: {
            type: "varchar",
            length: 2048,
            nullable: false
        },
        experience_years: {
            type: "int",
            nullable: false
        },
        experience: {
            type: "varchar",
            length: 2048,
            nullable: false
        },
        license_url: {
            type: "varchar",
            length: 2048,
            nullable: true
        },
        about_me: {
            type: "varchar",
            length: 2048,
            nullable: false
        },
        id_number: {
            type: "varchar",
            length: 10,
            nullable: false
        },
        profile_image_url: {
            type: "varchar",
            length: 2048,
            nullable: false
        },
        background_image_url: {
            type: "varchar",
            length: 2048,
            nullable: false
        },
        bankbook_copy_url: {
            type: "varchar",
            length: 2048,
            nullable: false
        },
        phone_number: {
            type: "varchar",
            width: 10,
            nullable: false
        },
        email: {
            type: "varchar",
            length: 320,
            nullable: false
        },
        password: {
            type: "varchar",
            length: 72,
            nullable: false
        },
        birthday: {
            type: "date",
            nullable: false
        },
        created_at: {
            type: "timestamp",
            nullable: false,
            createDate: true
        },
        update_at: {
            type: "timestamp",
            nullable: false,
            updateDate: true
        }
    }
});

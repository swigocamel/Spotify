// entities/User.js
const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: 'User',
  tableName: 'users',
  columns: {
    id: {
      type: 'uuid',
      primary: true,
      nullable: false,
      generated: 'uuid',
    },
    name: {
      type: 'varchar',
      length: 50,
      nullable: false,
    },
    email: {
      type: 'varchar',
      length: 320,
      nullable: false,
      unique: true,
    },
    password: {
      type: 'varchar',
      length: 72,
      nullable: false,
    },
    subscription_id: {
      type: 'uuid',
      nullable: true,
    },
    is_subscribed: {
      type: 'boolean',
      nullable: false,
      default: false,
    },
    profile_image_url: {
      type: 'varchar',
      length: 2048,
      nullable: true,
    },
    created_at: {
      type: 'timestamp',
      nullable: false,
      createDate: true,
    },
    update_at: {
      type: 'timestamp',
      nullable: false,
      updateDate: true,
    },
  },
});
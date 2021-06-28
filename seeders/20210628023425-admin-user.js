'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const now = new Date();
    return await queryInterface.bulkInsert('Users', [
      {
        username: 'admin',
        password: bcrypt.hashSync('admin', 10),
        display_name: '管理者',
        createdAt: now,
        updatedAt: now,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete('Users', null, {});
  },
};

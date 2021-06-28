'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const now = new Date();
    return await queryInterface.bulkInsert('Users', [
      { username: 'admin', password: 'admin', display_name: '管理者', createdAt: now, updatedAt: now },
      { username: 'user1', password: 'user2', display_name: 'ユーザー1', createdAt: now, updatedAt: now },
      { username: 'user2', password: 'user2', display_name: 'ユーザー2', createdAt: now, updatedAt: now },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete('Users', null, {});
  },
};

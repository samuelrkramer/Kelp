'use strict';

const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
    */
    return queryInterface.bulkInsert('Users', [
      // {
      //   username: 'JohnDoe',
      //   email: 'john@doe.demo',
      //   hashedPassword: '$2a$10$gACPTD5ByaJEhG.TyFZyc.I4NtAIujVEHxJ0G2jaxx40E2DOQpPbO'
      // },
      {
        email: 'demo@user.io',
        username: 'DemoUser',
        // hashedPassword: bcrypt.hashSync('password')
        hashedPassword: '$2a$10$gACPTD5ByaJEhG.TyFZyc.I4NtAIujVEHxJ0G2jaxx40E2DOQpPbO'
      },
      {
        email: 'rev@ie.wer',
        username: 'Fake Reviewer',
        hashedPassword: '$2a$10$gACPTD5ByaJEhG.TyFZyc.I4NtAIujVEHxJ0G2jaxx40E2DOQpPbO'
      }
      // {
      //   email: 'user1@user.io',
      //   username: 'FakeUser1',
      //   hashedPassword: bcrypt.hashSync('password2')
      // },
      // {
      //   email: 'user2@user.io',
      //   username: 'FakeUser2',
      //   hashedPassword: bcrypt.hashSync('password3')
      // }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
   const Op = Sequelize.Op;
   return queryInterface.bulkDelete('Users', {
     username: { [Op.in]: ['JohnDoe', 'Demo-lition', 'FakeUser1', 'FakeUser2']}
   });
  }
};

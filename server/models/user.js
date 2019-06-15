'use strict';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    token: DataTypes.STRING
  }, {});

  User.associate = function(models) {
    User.hasMany(models.userAccount, { as: 'accounts' });
  };

  return User;
};

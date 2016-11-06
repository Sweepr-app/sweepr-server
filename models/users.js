'use strict';

var bcrypt = require("bcrypt-nodejs");

module.exports = function(sequelize, DataTypes) {
  var Users = sequelize.define('Users', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    birth_date: DataTypes.DATE,
    group_id: DataTypes.INTEGER
  }, {
    paranoid: true,
    instanceMethods: {
      validPassword: function(password) {
        return bcrypt.compareSync(password, this.password);
      }
    },
    classMethods: {
      generateHash: function(password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
      },
      associate: function(models) {
        Users.hasMany(models.Signups, {foreignKey: 'participant_id'})
        Users.belongsTo(models.Group, {foreignKey: 'group_id'})
      }

    }
  });
  return Users;
};

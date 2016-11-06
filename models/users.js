'use strict';
module.exports = function(sequelize, DataTypes) {
  var Users = sequelize.define('Users', {
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    birth_date: DataTypes.DATE,
    group_id: DataTypes.INTEGER
  }, {
    paranoid: true,
    classMethods: {
      associate: function(models) {
        Users.hasMany(models.Signups, {foreignKey: 'participant_id'})
        Users.belongsTo(models.Group, {foreignKey: 'group_id'})
      }
    }
  });
  return Users;
};

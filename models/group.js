'use strict';
module.exports = function(sequelize, DataTypes) {
  var Group = sequelize.define('Group', {
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    owner_id: DataTypes.INTEGER
  }, {
    paranoid: true,
    classMethods: {
      associate: function(models) {
        Group.hasMany(models.Users, {foreignKey: 'group_id'})
      }
    }
  });
  return Group;
};

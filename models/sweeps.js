'use strict';
module.exports = function(sequelize, DataTypes) {
  var Sweeps = sequelize.define('Sweeps', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    created_by_user: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        Sweeps.belongsTo(models.Users)
      }
    }
  });
  return Sweeps;
};

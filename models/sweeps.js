'use strict';
module.exports = function(sequelize, DataTypes) {
  var Sweeps = sequelize.define('Sweeps', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    created_by_user: DataTypes.INTEGER,
    location_id: DataTypes.INTEGER,
    time_start: DataTypes.DATE,
    time_end: DataTypes.DATE,
    tagline: DataTypes.STRING
  }, {
    paranoid: true,
    classMethods: {
      associate: function(models) {
        Sweeps.belongsTo(models.Users, {foreignKey: 'created_by_user'})
        Sweeps.belongsTo(models.Locations, {foreignKey: 'location_id'})
        Sweeps.hasMany(models.Signups, {foreignKey: 'sweep_id'})
      }
    }
  });
  return Sweeps;
};

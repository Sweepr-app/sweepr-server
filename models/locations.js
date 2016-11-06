'use strict';
module.exports = function(sequelize, DataTypes) {
  var Locations = sequelize.define('Locations', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    type: DataTypes.STRING,
    created_by_user: DataTypes.INTEGER,
    street_address: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    zip_code: DataTypes.STRING,
    latitude: DataTypes.FLOAT,
    longitude: DataTypes.FLOAT
  }, {
    paranoid: true,
    classMethods: {
      associate: function(models) {
        Locations.belongsTo(models.Users, {foreignKey: 'created_by_user'})
        Locations.hasMany(models.Sweeps, {foreignKey: 'location_id'})
      }
    }
  });
  return Locations;
};

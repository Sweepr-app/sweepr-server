'use strict';
module.exports = function(sequelize, DataTypes) {
  var Signups = sequelize.define('Signups', {
    sweep_id: DataTypes.INTEGER,
    participant_id: DataTypes.INTEGER,
    confirmed: DataTypes.BOOLEAN
  }, {
    paranoid: true,
    classMethods: {
      associate: function(models) {
        Signups.belongsTo(models.Users, {foreignKey: 'participant_id'});
        Signups.belongsTo(models.Sweeps, {foreignKey: 'sweep_id'})
      }
    }
  });
  return Signups;
};

'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Season extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Season.belongsToMany(models.Fruit, {
        through: "SeasonFruit",
        foreignKey: "seasonId",
        otherKey: "fruitId",
      });
    }
  };
  Season.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Season',
  });
  return Season;
};
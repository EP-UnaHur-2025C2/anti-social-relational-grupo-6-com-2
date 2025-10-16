'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Post,{
        foreignKey: 'nickName'
      })
      User.hasMany(models.Comment,{
        foreignKey: 'nickName'
      })
    }
  }
  User.init({
    nickName:{
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    nombre:{
      type: DataTypes.STRING,
      allowNull: false
    },
    email:{ 
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    contrasenia:{
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'Users',
    timestamps: false
  });
  return User;
};
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Post.belongsTo(models.User,{
        foreignKey: 'nickName'
      })
      Post.hasMany(models.Comment,{
        foreignKey: 'id_comment'
      })
      Post.hasMany(models.Post_Images,{
        foreignKey: 'id_postImages'
      })
      Post.belongsToMany(models.Tag,{
        through: 'PostTags',
        foreignKey: 'id_post',
        otherKey: 'id_tag'
      })
    }
  }
  Post.init({
    id_post: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    fecha:{ 
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    descripcion:{ 
      type: DataTypes.STRING,
      allowNull:false
    }
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};
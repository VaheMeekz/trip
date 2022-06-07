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
    }
  }
  Post.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING(1234),
    date: DataTypes.STRING,
    additions: DataTypes.STRING(1234)
  }, {
    sequelize,
    modelName: 'Post',
  });

  let Image = sequelize.define("PostImage");
  Post.hasMany(Image,{
    foreignKey:"postId"
  })

  return Post;
};
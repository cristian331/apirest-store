const { DataTypes, Model } = require('sequelize');
// const {Sequelize} = require('sequelize');

const CATEGORY_TABLE = 'categories';
const CategorySchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    allowNull:false,
    type:DataTypes.STRING
  }//,
  // createdAt:{
  //   allowNull:false,
  //   type:DataTypes.DATE,
  //   field:'create_at',
  //   defaultValue:Sequelize.NOW
  // }
};

class Category extends Model{
  static associate(models){
    this.hasMany(models.Product, {
      as: 'products',
      foreignKey: 'categoryId'
    });
  }
  static config(sequelize){ //conexion sqlize
    return{
      sequelize,
      tableName:CATEGORY_TABLE,
      modelName:'Category',
      timestamps:false
    }
  }
}

module.exports = { CATEGORY_TABLE, CategorySchema, Category }

const { DataTypes, Model } = require('sequelize');
// const {Sequelize} = require('sequelize');

const PRODUCT_TABLE = 'products';
const ProductSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name:{
    allowNull:false,
    type:DataTypes.STRING,
    unique:true,
  },
  price:{
    allowNull:false,
    type: DataTypes.INTEGER
  },
  image:{
    allowNull: false,
    type:DataTypes.STRING
  }//,
  // createdAt:{
  //   allowNull:false,
  //   type:DataTypes.DATE,
  //   field:'create_at',
  //   defaultValue:Sequelize.NOW
  // }
};

class Product extends Model{
  static associate(){
    // associate
  }
  static config(sequelize){ //conexion sqlize
    return{
      sequelize,
      tableName:PRODUCT_TABLE,
      modelName:'Product',
      timestamps:false
    }
  }
}

module.exports = {PRODUCT_TABLE, ProductSchema, Product}

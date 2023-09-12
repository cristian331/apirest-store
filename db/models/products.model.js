const { DataTypes, Model } = require('sequelize');
const {Sequelize} = require('sequelize');
const { CATEGORY_TABLE } = require('./categories.model');

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
  description: {
    type:DataTypes.STRING
  },
  image:{
    allowNull: false,
    type:DataTypes.STRING
  },
  isblock:{
    allowNull:false,
    type:DataTypes.BOOLEAN
  },
  createdAt:{
    // allowNull:false,
    type:DataTypes.DATE,
    field:'created_at',
    defaultValue:Sequelize.NOW
  },
  categoryId:{
    field:'category_id',
    // allowNull:false,
    type:DataTypes.INTEGER,
    reference: {
      model: CATEGORY_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },

};

class Product extends Model{
  static associate(models){
    this.belongsTo(models.Category, {as: 'category'});
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

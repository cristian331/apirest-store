const { DataTypes, Model } = require('sequelize');
// const {Sequelize} = require('sequelize');

const USER_TABLE = 'users';
const UserSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    allowNull:false,
    type:DataTypes.STRING
  },
  email:{
    allowNull:false,
    type:DataTypes.STRING,
    unique:true,
  },
  password:{
    allowNull:false,
    type:DataTypes.STRING
  },
  gender: {
    allowNull:false,
    type:DataTypes.STRING
  },
  jobArea: {
    allowNull:false,
    type:DataTypes.STRING,
    field:'job_area',

  }//,
  // createdAt:{
  //   allowNull:false,
  //   type:DataTypes.DATE,
  //   field:'create_at',
  //   defaultValue:Sequelize.NOW
  // }
};

class User extends Model{
  static associate(){
    // associate
  }
  static config(sequelize){ //conexion sqlize
    return{
      sequelize,
      tableName:USER_TABLE,
      modelName:'User',
      timestamps:false
    }
  }
}

module.exports = { USER_TABLE, UserSchema, User }

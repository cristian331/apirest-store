const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
// const pool = require('../libs/postgres.pool');
const { models } = require('../libs/sequelize');

class UsersService {

  constructor () {
    this.users = [];
    // this.pool = pool;
    // this.pool.on('error', (err)=>console.log(err))
  }

  async create(data) {
    const hash = await bcrypt.hash(data.password, 10);
    const newUser = await models.User.create({
      ...data,
      password: hash
    });
    delete newUser.dataValues.password
    return newUser
  }

  async find() {
    const rta = await models.User.findAll();
    return rta
    //---------------------
    // const query = 'SELECT * FROM tasks';
    // const rta = await this.pool.query(query);
    // return rta.rows
    //---------------------
  }
  async findByEmail(email) {
    const rta = await models.User.findOne({
      where: { email }
    });
    return rta;
  }

  async findOne(id) {
    const user = await models.User.findByPk(id, {
      include: ['orders']
    });
    if (!user) {
      throw boom.notFound('User Not Found')
    }
    return user.dataValues
  }

  async update(id,changes) {
    const user = await this.findOne(id);
    const rta = await user.update(changes);
    return rta
  }

  async delete(id) {
    const user = await this.findOne(id);
    await user.destroy();
    return { id }
  }
}

module.exports = UsersService

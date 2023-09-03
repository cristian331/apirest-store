const { faker }  = require('@faker-js/faker');
// const boom = require('@hapi/boom')
// const pool = require('../libs/postgres.pool');
// const { models } = require('../libs/sequalize');

class UsersService {

  constructor () {
    this.users = [];
    this.generate();
    // this.pool = pool;
    // this.pool.on('error', (err)=>console.log(err))
  }

  generate() {
    const limit = 100
    for (let index = 0; index < limit; index++) {
      this.users.push({
        id: faker.string.uuid().split('-')[0],
        name: faker.person.fullName(),
        sex: faker.person.sex(),
        jobArea: faker.person.jobArea()
      });
    }
  }
  // return this.products

  async create(data) {

    //----------------
    // const newUser = await models.User.create(data)

    // --------------
    // if (name=== undefined || sex=== undefined || jobArea === undefined) {
    //   throw new Error('Data missing')
    // }
    //--------------
    const newUser = {
      id: faker.string.uuid().split('-')[0],
      ...data
    };
    this.users.push(newUser);
    return newUser
  }

  async find() {

    // const rta = await models.User.findAll();
    // return rta
    //---------------------
    // const query = 'SELECT * FROM tasks';
    // const rta = await this.pool.query(query);
    // return rta.rows
    //---------------------
    return this.users
  }

  async findOne(id) {

    // const user = await models.User.findByPk(id);
    // if(!user) {
    //   throw boom.notFound('User Not Found')
    // }
    // return user
    // //----------------
    const user = this.users.find(item => item.id === id)
    if(!user) {
      throw new Error('User Not Found')
    }
    return user
  }

  async update(id,changes) {

    // const user = await this.findOne(id);
    // const rta = await user.update(changes);
    // return rta
    //---------------------
    const i = this.users.findIndex(item => item.id === id)
    const user = this.users[i];

    if(i === -1) {
      throw new Error('User Not Found')
    }
    this.users[i] = {
      ...user,
      ...changes
    };
    return this.users[i];
  }

  async delete(id) {

    // const user = await this.findOne(id);
    // await user.destroy();
    // return { id }
    // ---------------------
    const i = this.users.findIndex(item => item.id === id);
    if(i === -1) {
      throw new Error('User Not Found')
    }
    const user = this.users[i]
    this.users.splice(i,1);
    return user
  }
}

module.exports = UsersService

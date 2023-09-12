const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class CategoriesService {

  constructor () {
    this.categories = [];
  }

  async create(data) {
    const newCateg = await models.Category.create(data);
    return newCateg
  }

  async find() {
    const rta = await models.Category.findAll();
    return rta
    // ----------------------
    // const query = 'SELECT * FROM categories'
    // const [data] = await sequelize.query(query);
    // return data
    //------------------------
    // return this.categories
  }

  async findOne(id) {
   const category = await models.Category.findByPk(id, {
    include: ['products']
   });


   if (!category) {
    throw boom.notFound('Category Not Found');
   }
    return category.dataValues
  }

  async update(id, changes) {
    const category = await this.findOne(id);
    const rta = await category.update(changes);
    return rta
  }

  async delete(id) {
    const category = await this.findOne(id);
    await category.destroy();
    return { id }
  }
}

module.exports = CategoriesService

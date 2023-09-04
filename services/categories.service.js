const { faker }  = require('@faker-js/faker');

class CategoriesService {

  constructor () {
    this.categories = [];
    this.generate();
  }

  generate() {
    const limit = 60
    for (let index = 0; index < limit; index++) {
      this.categories.push({
        id: index,
        name: faker.commerce.department()
      });
    }
  }

  async create(data) {
    const newCategory = {
      id: this.categories.length,
      ...data
    };
    this.categories.push(newCategory);
    return newCategory
  }

  async find() {
    return this.categories
  }

  async findOne(id) {
    const category = this.categories.find(item => item.id === id*1)
    if(!category) {
      throw new Error('Category Not Found')
    }
    return category
  }

  async update(id, changes) {
    const i = this.categories.findIndex(item => item.id === id*1)
    const category = this.categories[i];

    if(i === -1) {
      throw new Error('Category Not Found')
    }
    this.categories[i] = {
      ...category,
      ...changes
    };
    return this.categories[i];
  }

  async delete(id) {
    const i = this.categories.findIndex(item => item.id === id*1);
    if(i === -1) {
      throw new Error('Category Not Found')
    }
    const category = this.categories.splice(i,1);
    return category
  }
}

module.exports = CategoriesService
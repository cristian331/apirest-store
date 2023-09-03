const { faker }  = require('@faker-js/faker');
// const boom = require('@hapi/boom');
// const getConnection = require('./../libs/postgres');
// const { models } = require('../libs/sequalize');

class ProductsService {

  constructor () {
    this.products = [];
    this.generate();
  }

  generate() {
    const limit = 100;
    for (let index = 0; index < limit; index++) {
      this.products.push({
        id: faker.string.uuid().split('-')[0],
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price()),
        image: faker.image.url(),
        isblock: faker.datatype.boolean()
      });
    }
    // return this.products
  }

  async create(data) {
    const newProduct = {
      id: faker.string.uuid().split('-')[0],
      ...data,
      isblock: faker.datatype.boolean()
    }
    this.products.push(newProduct);
    return newProduct
  }

  // async findDB() {
  //   const client = await getConnection();
  //   const rta = await client.query('SELECT * FROM tasks');
  //   return rta.rows;
  // }

  async find() {
    //--------------------
    // const rta = await models.Product.findAll();
    // return rta
    // --------------------
    // const client = await getConnection();
    // const rta = await client.query('SELECT * FROM tasks');
    // return rta.rows;
    // --------------------
    return this.products
  }

  async findOne(id) {
    const product = this.products.find(item => item.id===id)

    //-------------------
    // if (!product) {
    //   throw boom.notFound('Product Not Found')
    // }
    // if (product.isblock) {
    //   throw boom.conflict('Product is Block for You')
    // }
    //------------------
    return product
  }

  async update(id, changes) {
    const i = this.products.findIndex(item => item.id === id)
    const product = this.products[i];
    if(i === -1) {
      throw new Error('Product Not Found')
      // throw boom.notFound('Product Not Found')
    }
    this.products[i] = {
      ...product,
      ...changes
    };
    return this.products[i];
  }

  async delete(id) {
    const i = this.products.findIndex(item => item.id === id);
    //   if(i === -1) {
      //     // throw book.notFound('Product Not Found')
      //   }
    const product = this.products.splice(i,1);
    return product
  }
}

module.exports = ProductsService;

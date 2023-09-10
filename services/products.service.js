const { faker }  = require('@faker-js/faker');
const boom = require('@hapi/boom');
const pool = require('./../libs/postgres.pool');
// const { models } = require('../libs/sequalize');

class ProductsService {

  constructor () {
    this.products = [];
    this.generate();
    this.pool = pool;
    this.pool.on('error', (err) => console.error(err));
  }

  generate() {
    const limit = 100;
    for (let index = 0; index < limit; index++) {
      this.products.push({
        id: faker.string.uuid().split('-')[0],
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price()),
        image: faker.image.url(),
        isblock: faker.datatype.boolean() // EJM logica negocio - como ejercicio para manejo de errores
      });
    }
    // return this.products
  }

  async create(data) {
    //------------------
    // const newProduct = {
    //   id: faker.string.uuid().split('-')[0],
    //   ...data,
    //   isblock: faker.datatype.boolean()
    // }
    // this.products.push(newProduct);
    // return newProduct
    //--------------------
    const query = `iNSERT INTO products (name, price, image, isblock) VALUES ('${data.name}',${data.price},'${data.image}','${data.isblock}');`;
    const queryId = 'SELECT id FROM products ORDER BY id DESC LIMIT 1';
    await this.pool.query(query);
    const newId = await this.pool.query(queryId);
    const id = await newId.rows[0].id;
    const rta = this.findOne(id);
    return rta;
  }

  // async findDB() {
  //   const client = await getConnection();
  //   const rta = await client.query('SELECT * FROM products');
  //   return rta.rows;
  // }

  async find() {
    //--------------------
    // const rta = await models.Product.findAll();
    // return rta
    // --------------------
    const query = 'SELECT * FROM products';
    const rta = await this.pool.query(query)
    return rta.rows;
    // --------------------
    // return this.products
  }

  async findOne(id) {
    // const product = this.products.find(item => item.id===id)
    //--------------------
    const query = `SELECT * FROM products WHERE id = ${id}`;
    const product = await this.pool.query(query)
    // return product.rows[0];
    //-------------------
    if (!product.rows[0]) {
      // throw new Error('Product Not Found')
      throw boom.notFound('Product Not Found')
    }
    // Validacion if block
    if (product.rows[0].isblock) {
      throw boom.conflict('Product is block for You')
    }
    //------------------
    return product.rows[0]
  }

  async update(id, changes) {
    const i = this.products.findIndex(item => item.id === id)
    const product = this.products[i];
    if(i === -1) {
      // throw new Error('Product Not Found')
      throw boom.notFound('Product Not Found')
    }
    this.products[i] = {
      ...product,
      ...changes
    };
    return this.products[i];
  }

  async delete(id) {
    const i = this.products.findIndex(item => item.id === id);
      if(i === -1) {
        // throw new Error('Product Not Found')
          throw boom.notFound('Product Not Found')
        }
    const product = this.products.splice(i,1);
    return product
  }
}

module.exports = ProductsService;

const boom = require('@hapi/boom');
const pool = require('./../libs/postgres.pool');
const { models } = require('../libs/sequelize');
const { Op } = require('sequelize');

class ProductsService {

  constructor () {
    this.products = [];
    this.pool = pool;
    this.pool.on('error', (err) => console.error(err));
  }

  async create(data) {
    const query = `iNSERT INTO products (name, price, image, isblock) VALUES ('${data.name}',${data.price},'${data.image}','${data.isblock}');`;
    const queryId = 'SELECT id FROM products ORDER BY id DESC LIMIT 1';
    await this.pool.query(query);
    const newId = await this.pool.query(queryId);
    const id = await newId.rows[0].id;
    const rta = this.findOne(id);
    return rta;
  }

  async find(query) {
    //--------------------
    const options = {
      include: ['category'],
      where: {}
    }
    const { limit, offset } = query;
    if (limit && offset) {
      options.limit = limit;
      options.offset = offset;
    }

    const { price } = query;
    if (price) {
      options.where.price = {
        [Op.gt] : price
      }
    }

    const rta = await models.Product.findAll(options);
    return rta
    /* --------------------
    const query = 'SELECT * FROM products';
    const rta = await this.pool.query(query)
    return rta.rows;
    --------------------
    return this.products*/
  }

  async findOne(id) {
    const product= await models.Product.findByPk(id, {
      include: ['category']
    })
    //-------------------
    // const query = `SELECT * FROM products WHERE id = ${id}`;
    // const product = await this.pool.query(query);
    //--------------------
    if (!product) {
      // throw new Error('Product Not Found')
      throw boom.notFound('Product Not Found')
    }
    // Validacion if block
    if (product.isblock) {
      return product.dataValues
      // throw boom.conflict('Product is block for You')
    }
    //------------------
    return product.dataValues
  }

  async update(id, changes) {
    const q = `SELECT * FROM products WHERE id = ${id}`;
    let product = (await this.pool.query(q)).rows[0];

    if(!product) {
      // throw new Error('Product Not Found')
      throw boom.notFound('Product Not Found')
    };
    const productUpdate = await {
      ...product,
      ...changes
    };
    const query = `UPDATE products SET name='${productUpdate.name}', price=${productUpdate.price}, image='${productUpdate.image}', isblock='${productUpdate.isblock}' WHERE id=${id}`;
    await this.pool.query(query);
    return await productUpdate
  }

  async delete(id) {
    const q = `SELECT * FROM products WHERE id = ${id}`;
    const product = (await this.pool.query(q)).rows[0];

    if(!product) {
      // throw new Error('Product Not Found')
      throw boom.notFound('Product Not Found')
    };
    const query = `DELETE FROM products WHERE id=${id}`
    await this.pool.query(query);
    return await product
  }
}

module.exports = ProductsService;

const express = require("express");

const ProductsService = require("../services/products.service");

const router = express.Router();
const service = new ProductsService();

router.get('/', async (req, res) => {
  // const { size } = req.query;
  // const limit = size || 10
  const products = await service.find();
  res.json(products);
})

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const product = await service.findOne(id);
  res.json({
    message: 'product was found',
    ...product
  });
})

router.post('/', async (req, res) => {
  const body = req.body;
  const newProduct = await service.create(body)
  res.json({
    message: 'Created',
    data: newProduct
  })
})

router.patch('/:id', async (req, res) => {
  const { id } = req.params
  const body = req.body;
  const updateProduct = await service.update(id, body);
  res.json({
    message: 'Updated',
    updateProduct
  })
})

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const deleteProduct = await service.delete(id)
  res.json({
    message: 'Deleted',
    deleteProduct
  })
})
module.exports = router

const express = require("express");

const ProductsService = require("../services/products.service");

const router = express.Router();
const service = new ProductsService();

router.get('/', async (req, res) => {
  // const { size } = req.query;
  // const limit = size || 10
  const products = await service.find();
  res.status(200).json(products);
})

router.get('/:id', async (req, res, next) => {
  try {
      const { id } = req.params;
      const product = await service.findOne(id);
      res.status(200).json({
        message: 'product was found',
        ...product
      });
    } catch (err) {
      // res.status(404).json({
      //   message: err.message
      // });
      // ------------------ middleware
        next(err);
    }
  })

router.post('/', async (req, res, next) => {
  try {
    const body = req.body;
    const newProduct = await service.create(body)
    res.status(201).json({
      message: 'Created',
      data: newProduct
    })
  } catch (err) {
    // res.status(404).json({
    //   message: err.message
    // })
    // ------------------ middleware
        next(err);
  }
})

router.patch('/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const body = req.body;
    const updateProduct = await service.update(id, body);
    res.json({
      message: 'Updated',
      updateProduct
    })
  } catch (err) {
    // res.status(404).json({
    //   message: err.message
    // })
    // ------------------ middleware
        next(err);
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleteProduct = await service.delete(id)
    res.json({
      message: 'Deleted',
      deleteProduct
    })
  } catch (err) {
    // res.status(404).json({
    //   message: err.message
    // })
    // ------------------ middleware
        next(err);
  }

})
module.exports = router

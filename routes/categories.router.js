const express = require("express");

const CategoriesService = require("./../services/categories.service")

const router = express.Router();
const service = new CategoriesService();

router.get('/', async (req, res) => {
  // const { size } = req.query;
  // const limit = size || 10
  const categories = await service.find();
  res.json(categories);
})

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const category = await service.findOne(id);
    res.json({
      message: 'category will be found',
      ...category
    });
  } catch (err) {
    // res.status(404).json({
    //   message: err.message
    // })
    // ------------------ middleware
    next(err);
  }
})

router.post('/', async (req, res, next) => {
  try {
    const body = req.body;
    const newCategory = await service.create(body);
    res.json({
      message: 'Created',
      data: newCategory
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
    const updateCat = await service.update(id, body);
    res.json({
      message: 'Updated',
      updateCat
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
    const deleteCat = await service.delete(id)
    res.json({
      message: 'Deleted',
      deleteCat
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

const express = require('express');
const OrderService = require('../services/orders.service');
const validatorHandler = require("./../middleware/validator.handler");

const { createOrderSchema, getOrderSchema } = require('../schemas/orders.schema');

const router = express.Router();
const service = new OrderService();

router.get('/:id',
	validatorHandler(getOrderSchema, 'params'),
	async (req, res, next) => {
		try {
			const { id } = req.params;
			const order = await service.findOne(id);
			res.json(order);
		} catch (error) {
			next(error);
		}
	}
);

router.post('/',
	validatorHandler(createOrderSchema, 'body'),
	async (req, res, next) => {
		try {
			const body = req.body;
			const newOrder = await service.create(body);
			res.status(201).json({ newOrder });
		} catch (error) {
			next(error);
		}
	}
);

module.exports = router;

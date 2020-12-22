const express = require('express');
const queryList = require('../database/queries');
const dbConnection = require('../database/index');
const runQuery = require('../database/runQuery');
const runQueryWithPlaceHolder = require('../database/runQueryWithPlaceHolder');
const validator = require('../validator');

const router = express.Router();

router
	.route('/')
	.get(async (req, res, next) => {
		try {
			const connection = await dbConnection.connect();
			const data = await runQuery(connection, queryList.selectAllQuery('score'));
			connection.release();
			return res.json(data);
		} catch (err) {
			return next(err.message);
		}
	})
	.post(async (req, res, next) => {
		try {
			const { body } = req;
			console.log(body);
			const data = [];
			data.push(body.name, body.level, body.score);
			if (body.email !== undefined) {
				await validator({ name: body.name, email: body.email });
			} else {
				await validator({ name: body.name });
			}
			const connection = await dbConnection.connect();
			await runQueryWithPlaceHolder(connection, queryList.insertQuery('score'), [data]);
			connection.release();
			return res.json({
				status: 'success',
				message: 'successfully updated scores',
			});
		} catch (err) {
			return next(err.message);
		}
	})
	.put((req, res) => {
		return res.status(400).json({
			status: 'invalid',
			message: 'cannot update data on current endpoint',
		});
	})
	.delete((req, res) => {
		return res.status(400).json({
			status: 'invalid',
			message: 'cannot delete data on current endpoint',
		});
	});

module.exports = router;

const express = require('express');
const queryList = require('../database/queries');
const dbConnection = require('../database/index');
const runQuery = require('../database/runQuery');
const runQueryWithPlaceHolder = require('../database/runQueryWithPlaceHolder');
const validator = require('../validator');
const logger = require('../logger');
const sendMail = require('../mailgun');

const router = express.Router();

router
	.route('/')
	.get(async (req, res, next) => {
		try {
			const connection = await dbConnection.connect();
			logger.info('database connection established');
			const data = await runQuery(connection, queryList.selectAllQuery('score'));
			connection.release();
			logger.info('database connection released');
			return res.json(data);
		} catch (err) {
			return next(err.message);
		}
	})
	.post(async (req, res, next) => {
		try {
			const { body } = req;
			const data = [];
			data.push(body.name, body.level, body.score);
			if (body.email !== undefined) {
				await validator({ name: body.name, email: body.email });

				const mailStatus = await sendMail(body.email, body.message);
				return res.json({
					status: `${mailStatus.message}`,
					message: `successfully mail sent to ${body.email}`,
				});
			}

			await validator({ name: body.name });
			const connection = await dbConnection.connect();
			logger.info('database connection established');
			logger.info('database connection released');
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

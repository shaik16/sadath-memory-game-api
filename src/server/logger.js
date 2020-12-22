const winston = require('winston');

const logger = winston.createLogger({
	transports: [
		new winston.transports.Console({
			level: 'info',
			format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
		}),
		new winston.transports.Console({
			level: 'error',
			format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
		}),
		new winston.transports.File({
			level: 'info',
			filename: 'info.log',
			format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
		}),
		new winston.transports.File({
			level: 'error',
			filename: 'error.log',
			format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
		}),
	],
});

module.exports = logger;

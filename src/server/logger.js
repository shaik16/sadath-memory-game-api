const winston = require('winston');

const logColors = {
	colors: {
		info: 'cyan',
		error: 'red',
	},
};

winston.addColors(logColors);

const logger = winston.createLogger({
	transports: [
		new winston.transports.Console({
			level: 'info',
			format: winston.format.combine(
				winston.format.colorize(),
				winston.format.timestamp(),
				winston.format.json(),
				winston.format.printf(
					(info) => `{level: ${info.level}, message: ${info.message}, timestamp: ${info.timestamp}}`
				)
			),
		}),
		new winston.transports.Console({
			level: 'error',
			format: winston.format.combine(
				winston.format.colorize(),
				winston.format.timestamp(),
				winston.format.json(),
				winston.format.printf(
					(error) =>
						`{level: ${error.level}, message: ${error.message}, timestamp: ${error.timestamp}}`
				)
			),
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

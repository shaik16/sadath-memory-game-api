const dotenv = require('dotenv');

dotenv.config();

module.exports = {
	port: process.env.PORT,
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	pass: process.env.DB_PASS,
	DB: process.env.DB,
	API_KEY: process.env.API_KEY,
	DOMAIN: process.env.DOMAIN,
};

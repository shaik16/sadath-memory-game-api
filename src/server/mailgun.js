const mailgun = require('mailgun-js');
const env = require('./config');

const apiKey = env.API_KEY;
const domain = env.DOMAIN;

const sendMail = (email, message) => {
	const mail = mailgun({ apiKey, domain });
	return new Promise((resolve, reject) => {
		const data = {
			from: 'Memory Game <no-reply@memory-game.com>',
			to: `${email}`,
			subject: 'Highest Score',
			text: `${message}`,
		};

		mail.messages().send(data, function (error, body) {
			if (error) {
				return reject(error);
			}
			return resolve(body);
		});
	});
};

module.exports = sendMail;

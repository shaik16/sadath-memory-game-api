const Joi = require('joi');

const validator = (obj) => {
	return new Promise((resolve, reject) => {
		const schema = Joi.object({
			name: Joi.string().min(4).max(7).required(),
			email: Joi.string().email(),
		});

		const result = schema.validate(obj);
		if (result.error) {
			return reject(result.error.details[0]);
		}
		return resolve('Success');
	});
};

module.exports = validator;

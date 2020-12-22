const express = require('express');
const cors = require('cors');
const env = require('./config');

const app = express();
app.use(cors());
const routes = require('./router/routes');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
	res.json({
		status: 'active! Welcome to the memory-game api',
		message: 'append the url with /api for highScores data',
	});
});

app.use('/api', routes);

app.use((err, req, res, next) => {
	console.error(err);
	return res.status(500).json({
		status: 'Error',
		message: err,
	});
});

app.get('/api*', (req, res) => {
	res.status(400).json({
		status: 'invalid!',
		message: 'Append the url correctly! with just /api only',
	});
});

app.get('/*', (req, res) => {
	res.status(404).json({
		status: 'invalid!',
		message: `The url doesn't exist append the url with /api only`,
	});
});

app.listen(process.env.PORT || env.port, () => {
	console.log(`Server started on ${process.env.PORT || 3000}`);
});

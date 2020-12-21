const express = require('express');
const env = require('./config');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
	res.json({
		message: 'Welcome to the api of memory-game',
	});
});

app.listen(process.env.PORT || env.port, () => {
	console.log(`Server started on ${process.env.PORT || 3000}`);
});

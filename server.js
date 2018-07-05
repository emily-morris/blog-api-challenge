const express = require('express');
const morgan = require('morgan');

const app = express();

//log http layer
app.use(morgan('common'));

app.listen(process.env.PORT || 8080, () => {
	console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
});
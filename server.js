const express = require('express');
const morgan = require('morgan');

const app = express();
app.use(express.json());

const blogPostRouter = require('./blogPostRouter');

//log http layer
app.use(morgan('common'));

app.use('/blog-posts', blogPostRouter);

//server object for runServer and closeServer to access
let server;

//starts server and returns a promise
function runServer() {
	const port = process.env.PORT || 8080;
	return new Promise((resolve, reject) => {
		server = app
			.listen(port, () => {
				console.log(`Your app is listening on port ${port}`);
				resolve(server);
		})
			.on('error', err => {
				reject(err);
		});
	});
}

//manually creates and returns a promise
function closeServer() {
	return new Promise((resolve, reject) => {
		console.log('Closing server');
		server.close(err => {
			if(err) {
				reject(err);
				return;
			}
			resolve();
		});
	});
}

//if server.js is called directly (with `node server.js`), this runs
//also export runServer command so other code can start server as needed
if(require.main === module) {
	runServer().catch(err => console.error(err));
}

module.exports = {app, runServer, closeServer};
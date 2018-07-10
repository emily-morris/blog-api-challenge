const express = require('express');
//create new Express router instance
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const {BlogPosts} = require('./models');

//add data to BlogPosts
BlogPosts.create('Chuck Norris Facts', 'If you spell Chuck Norris in Scrabble, you win.', 'numberOneChuckNorrisFan', 'July 3rd, 2018');
BlogPosts.create('Best Foods', 'Toffee cheesecake sugar plum lollipop!', 'iWantCandy', 'July 4th, 2018');
BlogPosts.create('Advice From Bob Ross', 'In your imagination you can go anywhere you want.', 'happyTree', 'July 5th, 2018');

//return all blogposts
router.get('/', (req, res) => {
	res.json(BlogPosts.get());
});

//post new blog entry, make sure it has required fields.
//if not, log error and return 400 status code.
//if okay, add new item to BlogPosts and return with 201
router.post('/', jsonParser, (req, res) => {
	//ensure 'title', 'content', 'author', and 'publishDate' are in request body
	const requiredFields = ['title', 'content', 'author', 'publishDate'];
	for(let i = 0; i < requiredFields.length; i++) {
		const field = requiredFields[i];
		if(!(field in req.body)) {
			const message = `Missing \`${field}\` in request body`;
			console.error(message);
			return res.status(400).send(message);
		}
	}
	const item = BlogPosts.create(req.body.title, req.body.content, req.body.author, req.body.publishDate);
	res.status(201).json(item);
});

router.delete('/:id', (req, res) => {
	BlogPosts.delete(req.params.id);
	console.log(`Deleted blogpost \`${req.params.id}\``);
	res.status(204).end();
});

//make sure request has required fields, item id in url path and id in updated item object match
//if not log error and send back status code 400
//otherwise call `BlogPosts.update`
router.put('/:id', jsonParser, (req, res) => {
	const requiredFields = ['title', 'content', 'author', 'publishDate', 'id'];
	for(let i = 0; i < requiredFields.length; i++) {
		const field = requiredFields[i];
		if(!(field in req.body)) {
			const message = `Missing \`${field}\` in request body`;
			console.error(message);
			return res.status(400).send(message);
		}
	}
	if(req.params.id !== req.body.id) {
		const message = (
			`Request path id (${req.params.id}) and request body id`
			`(${req.body.id}) must match`);
		console.error(message);
		return res.status(400).send(message);
	}
	console.log(`Updating blogpost \`${req.params.id}\``);
	const updatedItem = BlogPosts.update({
		id: req.params.id,
		title: req.body.title,
		content: req.body.content,
		author: req.body.author,
		publishDate: req.body.publishDate
	});
	res.status(204).end();
});

//export router instance
module.exports = router;
hi
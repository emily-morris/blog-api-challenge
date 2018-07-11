const chai = require('chai');
const chaiHttp = require('chai-http');

const {app, closeServer, runServer} = require('../server');

//lets us use expect style syntax in our tests
const expect = chai.expect;

//lets us make HTTP requests in our tests
chai.use(chaiHttp);

describe('Blog Posts', function() {
	//activate server before tests run so tests don't start running before server starts
	before(function() {
		return runServer();
	});
	//close server at the end of tests
	after(function() {
		return closeServer();
	});

	it('should show blog posts on GET', function() {
		return chai
			.request(app)
			.get('/blog-posts')
			.then(function(res) {
				expect(res).to.have.status(200);
				expect(res).to.be.json;
				expect(res.body).to.be.a('array');

				expect(res.body.length).to.be.at.least(1);
				const expectedKeys = ['id', 'title', 'content', 'author', 'publishDate'];
				res.body.forEach(function(item) {
					expect(item).to.be.a('object');
					expect(item).to.include.keys(expectedKeys);
				});
			});
	});

	it('should add a new blog post on POST', function() {
		const newItem = {title: 'Who is the best person on Project Runway?', content: 'Tim Gunn', author: 'makeItWork', publishDate: 'July 10th, 2018'};
		return chai
			.request(app)
			.post('/blog-posts')
			.send(newItem)
			.then(function(res) {
				expect(res).to.have.status(201);
				expect(res).to.be.json;
				expect(res.body).to.be.a('object');
				expect(res.body).to.include.keys('id', 'title', 'content', 'author', 'publishDate');
				expect(res.body.id).to.not.equal(null);
				expect(res.body).to.deep.equal(
					Object.assign(newItem, {id: res.body.id})
				);
			});
	});

	it('should update items on PUT', function() {
		const updateData = {
			title: 'foo',
			content: 'bar',
			author: 'bizz',
			publishDate: 'bang'
		};

		return (
			chai
				.request(app)
				.get('/blog-posts')
				.then(function(res) {
					updateData.id = res.body[0].id;
					return chai
						.request(app)
						.put(`/blog-posts/${updateData.id}`)
						.send(updateData);
				})
				.then(function(res) {
					expect(res).to.have.status(200);
					expect(res).to.be.json;
					expect(res.body).to.be.a('object');
					expect(res.body).to.deep.equal(updateData);
				})
		);
	});

	// it('should delete items on DELETE', function() {
	// 	return (
	// 		chai
	// 			.request(app)
	// 			.get('/blog-posts')
	// 			.then(function(res) {
	// 				return chai.request(app).delete(`/blog-posts/${res.body[0].id}`);
	// 			.then(function(res) {
					
	// 			})
	// 			})
	// 	);
	// });
});
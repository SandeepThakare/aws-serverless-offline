const request = require('supertest');

describe('getCustomerInfo test', function () {

	let path = 'http://localhost:3000';

	it('respond with json', function (done) {
		request(path)
			.get('/getCustomerInfo/sandythakare9@gmail.com')
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(200, { email: 'sandythakare9@gmail.com'}, done);
	});
});
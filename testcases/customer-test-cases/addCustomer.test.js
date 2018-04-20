require('dotenv').load();
// var expect = require('chai').expect;
// var LambdaTester = require('lambda-tester');
var addCustomerInfo = require('../../customerInfo/addCustomerInfo').addCustomerInfo;
var assert = require('chai').assert;
// var should = require('chai').should();
const request = require('supertest');

describe('addCustomerInfo test', function () {

	let path = 'http://localhost:3000';

	it('respond with json', (done) => {
		request(path)
			.put('/addCustomerInfo', (err, res) => {
				if (err) {
					throw new Error('Cannot fulfill the request');
				} else {
					console.log(res);
				}
			})
			.send({
				'email': 'tsandycool@gmail.com',
				'sddaas': 'sadasas',
				'sadasdas': 'adfasdasdsa'
			}, (err, res) => {
				if (err) {
					throw new Error('Cannot fulfill the request');
				} else {
					console.log(res);
				}
			})
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.end(function (err, res) {
				if (err || !res.ok) {
					console.log(err);
				} else {
					console.log(JSON.stringify(res, undefined, 2));
					done();
				}
			});
	});
	// it('successful invocation: addCustomer function', function (done) {
	// 	var event = {
	// 		'body': {
	// 			'email': 'sandythakare9@gmail.com',
	// 			'sddaas': 'sadasas',
	// 			'sadasdas': 'adfasdasdsa'
	// 		}
	// 	};
	// 	var context = {};
	// 	var callback = (ctx, data) => {
	// 		try {
	// 			// console.log('test data -', data);
	// 			// console.log(data.body.message, data.statusCode);
	// 			assert(data.body);
	// 			assert(data.statusCode == 200);
	// 			done();
	// 		}
	// 		catch (err) {
	// 			console.log('error', err);
	// 			done(err);
	// 		}
	// 	};
	// 	addCustomerInfo(event, context, callback);
	// });

	// it('successful invocation: addCustomer function', function (done) {
	// 	var event = {
	// 		'body': {
	// 			'sddaas': 'sadasas',
	// 			'sadasdas': 'adfasdasdsa'
	// 		}
	// 	};
	// 	var context = {};
	// 	var callback = (ctx, data) => {
	// 		try {
	// 			// console.log('test data -', data);
	// 			// console.log(JSON.parse(data.body), data.statusCode);
	// 			let bodydata = JSON.parse(data.body);
	// 			assert(bodydata.message === 'full parameter not specified');
	// 			assert(data.statusCode == 406);
	// 			done();
	// 		}
	// 		catch (err) {
	// 			console.log('error', err);
	// 			done(err);
	// 		}
	// 	};
	// 	addCustomerInfo(event, context, callback);
	// });
});
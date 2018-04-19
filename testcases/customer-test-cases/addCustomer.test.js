require('dotenv').load();
var expect = require('chai').expect;
// var LambdaTester = require('lambda-tester');
var addCustomerInfo = require('../../customerInfo/addCustomerInfo').addCustomerInfo;
var assert = require('chai').assert;
var should = require('chai').should();

describe('addCustomerInfo test', function () {

	it('successful invocation: addCustomer function', function (done) {
		var event = {
			'body': {
				'email': 'sandythakare9@gmail.com',
				'sddaas': 'sadasas',
				'sadasdas': 'adfasdasdsa'
			}
		};
		var context = {};
		var callback =(ctx, data) => {
			try{
				// console.log('test data -', data);
				// console.log(data.body.message, data.statusCode);
				assert(data.body);
				assert(data.statusCode == 200);
				done();
			}
			catch (err){
				console.log('error', err);
				done(err);
			}
		};
		addCustomerInfo(event, context, callback);
	});
    
	it('successful invocation: addCustomer function', function (done) {
		var event = {
			'body': {
				'sddaas': 'sadasas',
				'sadasdas': 'adfasdasdsa'
			}
		};
		var context = {};
		var callback =(ctx, data) => {
			try{
				// console.log('test data -', data);
				// console.log(JSON.parse(data.body), data.statusCode);
				let bodydata = JSON.parse(data.body);
				assert(bodydata.message === 'full parameter not specified');
				assert(data.statusCode == 406);
				done();
			}
			catch (err){
				console.log('error', err);
				done(err);
			}
		};
		addCustomerInfo(event, context, callback);
	});
});
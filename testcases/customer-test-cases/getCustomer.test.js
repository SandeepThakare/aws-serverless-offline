require('dotenv').load();
// var expect = require('chai').expect;
// var LambdaTester = require('lambda-tester');
var getCustomerInfo = require('../../customerInfo/getCustomerInfo').getCustomerInfo;
var assert = require('chai').assert;
// var should = require('chai').should();

describe('getCustomerInfo test', function () {

	it('successful invocation: getCustomer function', function (done) {
		var event = {
			'pathParameters': {'email':'sandythakare9@gmail.com'}
		};
		var context = {};
		var callback =(ctx, data) => {
			try{
				console.log('test data -', data);
				// console.log(data.body.message, data.statusCode);
				assert(data);
				assert(data.statusCode == 200);
				done();
			}
			catch (err){
				console.log('error', err);
				done(err);
			}
		};
		getCustomerInfo(event, context, callback);
	});
    
	it('successful invocation: getCustomer 2 function', function (done) {
		var event = {
			'pathParameters': {'email':'sandythakare9'}
		};
		var context = {};
		var callback =(ctx, data) => {
			try{
				// console.log('test data -', data);
				// console.log(JSON.parse(data.body), data.statusCode);
				// let bodydata = JSON.parse(data.body);
				// assert(data.body === 'Invalid Email');
				assert(data.statusCode == 406);
				done();
			}
			catch (err){
				console.log('error', err);
				done(err);
			}
		};
		getCustomerInfo(event, context, callback);
	});
});
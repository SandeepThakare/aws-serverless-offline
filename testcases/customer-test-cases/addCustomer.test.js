var expect = require('chai').expect;

var LambdaTester = require('lambda-tester');

var addCustomerInfo = require('../../customerInfo/addCustomerInfo');

describe('addCustomerInfo', function () {

	[
		{
			'email': 'sandythakare9@gmail.com',
			'sddaas': 'sadasas',
			'sadasdas': 'adfasdasdsa'
		}

	].forEach(function (addObject) {

		it('successful invocation: addCustomer function',
			function (done) {

				LambdaTester(addCustomerInfo.addCustomerInfo)
					.event(addObject)
					.expectSucceed(function (body) {
						expect(body.message).to
							.equal('Data Added successfully !!!');
					})
					.verify(done);
			});
	});

	[
		{
			'sddaas': 'sadasas',
			'sadasdas': 'adfasdasdsa'
		}

	].forEach(function (invalidObject) {

		it('fail: when email is invalid: addCustomer function',
			function (done) {

				LambdaTester(addCustomerInfo.addCustomerInfo)
					.event(invalidObject)
					.expectFail(function (body) {
						expect(body.message).to
							.equal('full parameter not specified');
					})
					.verify(done);
			});
	});
});
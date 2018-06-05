const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
import Common from '../common/common';
// import AWS from 'aws-sdk';
import StatusCode from '../common/statusCode';
let statusCode = new StatusCode().getStatusCode();
// const lambda = new AWS.Lambda();

module.exports.getCustomerInfo = async (event, context, callback) => {

	console.log('path par');

	var emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

	let a = new Common();
	let scanParams = new Common().scanParams(process.env.CUSTOMER_INFO);

	if (!event.pathParameters && !event.pathParameters.email) {
		callback(null, a.callbackHandler(statusCode.BAD_REQUEST, 'Email Missing'));
		return;
	}

	// if (!emailRegex.test(event.pathParameters.email)) {
	// 	var response = {
	// 		statusCode: 406,
	// 		headers: {
	// 			'Access-Control-Allow-Origin': '*',
	// 			'Access-Control-Allow-Headers': '*',
	// 			'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT'
	// 		},
	// 		body: JSON.stringify('Invalid Email'),
	// 	};
	// 	callback(null, response);
	// 	return;
	// }

	var email = event.pathParameters.email;
	console.log('email', email);
	var queryParams = {
		TableName: process.env.CUSTOMER_INFO,
		KeyConditionExpression: 'email = :em',
		ExpressionAttributeValues: {
			':em': email
		}
	};

	// var getAppMarketParams = {
	// 	TableName: process.env.APPLICATION_MARKET,
	// 	KeyConditionExpression: 'application_id = :id',
	// 	ExpressionAttributeValues: {
	// 		':id': parseInt(applicationId)
	// 	}
	// };

	// var scanParams = {
	// 	TableName: process.env.CUSTOMER_INFO
	// };

	console.log('Query params - ', queryParams);

	dynamoDb.scan(scanParams, async (err, data) => {
		console.log('Inside', JSON.stringify(queryParams));
		if (err) {
			console.error('Unable to scan the table. Error JSON:', JSON.stringify(err, null, 2));
			callback(null, await a.callbackHandler(statusCode.BAD_REQUEST, err));
			return;
		} else {
			console.log('data in customer', data);
			if (data.Items.length) {
				// var subscribersArr = data.Items[0].email;
				console.log('firstarr ', data.Items);
				// delete data.Items[0].createdAt
				// console.log('after delete ',data.Items[0].createdAt);
				var custData = data.Items;
				// onSuccess(data.Items[0]);
				console.log('CustData - ', custData);
				let res = a.callbackHandler(statusCode.OK, custData)
				// callback(null, );
				console.log(res);
				onSuccess(res);
				return;

			} else {
				console.log('No Customer');
				// onSuccess('No customer added');
				callback(null, await a.callbackHandler(statusCode.OK, 'No customer added'));
				return;
			}
		}
	});

	function onQuery(err, data) {
		console.log('Inside', JSON.stringify(queryParams));
		if (err) {
			console.error('Unable to scan the table. Error JSON:', JSON.stringify(err, null, 2));
			onError(err);
		} else {
			console.log('data in customer', data);
			if (data.Items.length) {
				// var subscribersArr = data.Items[0].email;
				console.log('firstarr ', data.Items);
				// delete data.Items[0].createdAt
				// console.log('after delete ',data.Items[0].createdAt);
				var custData = data.Items;
				// onSuccess(data.Items[0]);
				console.log('CustData - ', custData);
				onSuccess(custData);

			} else {
				console.log('No Customer');
				onSuccess('No customer added');
			}
		}
	}

	function onError(err) {
		const res = {
			statusCode: 400,
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Headers': '*',
				'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT'
			},
			body: JSON.stringify(err)
		};
		callback(null, res);
	}

	function onSuccess(response) {
		// const res = {
		// 	statusCode: 200,
		// 	headers: {
		// 		'Access-Control-Allow-Origin': '*',
		// 		'Access-Control-Allow-Headers': '*',
		// 		'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT'
		// 	},
		// 	body: JSON.stringify(response)
		// };

		// console.log(res);
		console.log(response);

		callback(null, response);
	}
};
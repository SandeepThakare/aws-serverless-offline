const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
// const lambda = new AWS.Lambda();

module.exports.getCustomerInfo = (event, context, callback) => {

	console.log('path par');

	var emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;


	if (!event.pathParameters && !event.pathParameters.email) {
		var res = {
			statusCode: 406,
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Headers': '*',
				'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT'
			},
			body: JSON.stringify('Email Missing'),
		};
		callback(null, res);
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

	var scanParams = {
		TableName: process.env.CUSTOMER_INFO
	};

	console.log('Query params - ', queryParams);

	dynamoDb.scan(scanParams, (err, data) => {
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
		const res = {
			statusCode: 200,
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Headers': '*',
				'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT'
			},
			body: JSON.stringify(response)
		};

		console.log(res);

		callback(null, res);
	}
};
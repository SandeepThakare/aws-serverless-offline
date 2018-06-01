
'use strict';
const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

// const dynamoDb = require('./dynamodb');

// AWS.config.update({ region: process.env.region });

module.exports.addCustomerInfo = (event, context, callback) => {
	var eventData = {};
	var createdAt = new Date().toUTCString();
	console.log('Inside');
	// var dbUserData;
	// var customerdatalength;
	// var id = null;
	// console.log('Event body=', JSON.stringify(event.body));
	// console.log('Event body=', typeof (event.body));

	// console.log('Region - ', AWS.config.region);

	// if (!AWS.config.region) {
	// 	AWS.config.update({
	// 		region: process.env.region
	// 	});
	// }

	// console.log('Region - ', AWS.config.region);

	if (event.body && typeof (event.body) === 'string') {
		eventData = JSON.parse(event.body);
	} else {
		eventData = event.body;
	}

	var email = eventData.email || event.email;
	// var userdata = {};
	// userdata = eventData;

	// console.log('Event DATA=', email);

	if (!eventData.email) {

		const response = {
			statusCode: 406,
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Headers': '*',
				'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT'
			},
			body: JSON.stringify({
				message: 'full parameter not specified'
			}),
		};
		callback(null, response);
		return;
	}

	var params = {
		TableName: process.env.CUSTOMER_INFO,
		Item: {
			email: email,
			created_at: createdAt,
			customerData: eventData
		},
	};

	// console.log(params);

	dynamoDb.put(params, (err, data) => {
		// console.log('inside - ', addCustomerInfoParams);
		if (!err) {
			// console.log('Data - ', data);
			const response = {
				statusCode: 200,
				headers: {
					'Access-Control-Allow-Origin': '*',
					'Access-Control-Allow-Headers': '*',
					'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT'
				},
				body: JSON.stringify({
					message: 'Data Added successfully !!!',
					data: data
				}),
			};
			callback(null, response);
		} else {
			// console.log(err);

			const response = {
				statusCode: 401,
				headers: {
					'Access-Control-Allow-Origin': '*',
					'Access-Control-Allow-Headers': '*',
					'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT'
				},
				body: JSON.stringify(err),
			};
			callback(null, response);
		}
	});
};
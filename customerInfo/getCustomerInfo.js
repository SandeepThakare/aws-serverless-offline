const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
// const lambda = new AWS.Lambda();

module.exports.getCustomerInfo = (event, context, callback) => {

	console.log('path par');

	if (!event.pathParameters && !event.pathParameters.email) {
		var res = {
			statusCode: 500,
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Headers': '*',
				'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT'
			},
			body: 'Email Missing'
		};
		callback(null, res);
		return;
	}
	var email = event.pathParameters.email;
	console.log('email', email);
	var queryParams = {
		TableName: process.env.CUSTOMER_INFO,
		KeyConditionExpression: 'email = :em',
		ExpressionAttributeValues: {
			':em': email,
		}
	};

	dynamoDb.query(queryParams, onQuery);

	function onQuery(err, data) {
		console.log('Inside', JSON.stringify(queryParams));
		if (err) {
			console.error('Unable to scan the table. Error JSON:', JSON.stringify(err, null, 2));
			onError(err);
		} else {
			console.log('data', data);
			if (data.Items.length) {
				// var subscribersArr = data.Items[0].email;
				console.log('firstarr ', data.Items);
				// delete data.Items[0].createdAt
				// console.log('after delete ',data.Items[0].createdAt);
				var custData = data.Items[0];
				// onSuccess(data.Items[0]);
				if (custData.userdata.properties_owned) {
					for (var index = 0; index < custData.userdata.properties_owned.length; index++) {
						// var element = array[index];

						console.log('length=', custData.userdata.properties_owned.length);

						if (custData.userdata.properties_owned[index].deleted === true) {
							// delete custData.userdata.properties_owned[index];
							custData.userdata.properties_owned.splice(index, 1);
							index--;
						}
						console.log('After delete = ', custData);
					}
				}

				onSuccess(custData);

			} else {
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
		callback(null, res);
	}
};
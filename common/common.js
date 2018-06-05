export default class common {
	constructor() {
		// console.log('In common js constructor');
	}

	callbackHandler(statusCode, message) {

		let res = {
			StatusCode: statusCode,
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Headers': '*',
				'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT' 
			},
			body: JSON.stringify(message)
		};
        
		return res;
	}
    
	postParams(tableName, items) {
		let params = {
			TableName: tableName,
			Item: items
		};

		return params;
	}
    
	scanParams(tableName) {
		let params = {
			TableName: tableName
		};
        
		return params;
	}

	queryParams(tableName, key, keyvalue) {
		let params = {
			TableName: tableName,
			KeyConditionExpression: `${key} = :pk`,
			ExpressionAttributeValues: {
				':pk': decodeURIComponent(keyvalue)
			}
		};
		return params;
	}
}
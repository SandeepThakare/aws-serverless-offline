require('dotenv').config({ path: '../.env' /* path to your project root folder */ });
// import { DynamoDB } from 'aws-sdk'; // eslint-disable-line import/no-extraneous-dependencies
import AWS from 'aws-sdk';
// const dynamoDB = new AWS.DynamoDB.DocumentClient();
let options = null;
console.log('Envoirment -----> ', process.env.IS_OFFLINE);
// connect to local DB if running offline
if (!process.env.IS_OFFLINE) {
	console.log('Inside of offline');
	options = {
		region: 'us-east-1',
		endpoint: 'http://localhost:8000',
	};
}

console.log('Outside');
const dynamoDB = new AWS.DynamoDB.DocumentClient(options);

export default dynamoDB;
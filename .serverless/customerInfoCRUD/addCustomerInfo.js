(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	
	'use strict';

	var AWS = __webpack_require__(1);
	var dynamoDb = new AWS.DynamoDB.DocumentClient();

	// const dynamoDb = require('./dynamodb');

	// AWS.config.update({ region: process.env.region });

	module.exports.addCustomerInfo = function (event, context, callback) {
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

		if (event.body && typeof event.body === 'string') {
			eventData = JSON.parse(event.body);
		} else {
			eventData = event.body;
		}

		var email = eventData.email || event.email;
		// var userdata = {};
		// userdata = eventData;

		// console.log('Event DATA=', email);

		if (!eventData.email) {

			var response = {
				statusCode: 406,
				headers: {
					'Access-Control-Allow-Origin': '*',
					'Access-Control-Allow-Headers': '*',
					'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT'
				},
				body: JSON.stringify({
					message: 'full parameter not specified'
				})
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
			}
		};

		// console.log(params);

		dynamoDb.put(params, function (err, data) {
			// console.log('inside - ', addCustomerInfoParams);
			if (!err) {
				// console.log('Data - ', data);
				var _response = {
					statusCode: 200,
					headers: {
						'Access-Control-Allow-Origin': '*',
						'Access-Control-Allow-Headers': '*',
						'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT'
					},
					body: JSON.stringify({
						message: 'Data Added successfully !!!',
						data: data
					})
				};
				callback(null, _response);
			} else {
				// console.log(err);

				var _response2 = {
					statusCode: 401,
					headers: {
						'Access-Control-Allow-Origin': '*',
						'Access-Control-Allow-Headers': '*',
						'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT'
					},
					body: JSON.stringify(err)
				};
				callback(null, _response2);
			}
		});
	};

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	module.exports = require("aws-sdk");

/***/ })
/******/ ])));
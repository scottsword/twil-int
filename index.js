'use strict;'

const Hapi = require('hapi');
const server = new Hapi.Server();
const twilio = require('twilio');
const q = require('q');
const Bluebird = require('bluebird');

const tsAPI = {};

tsAPI.getStatus = function() {

	// const dfd = q.defer();

	// setTimeout(function() {

	// 	console.log("Promise resolved.");
	// 	dfd.resolve("hell yeah buddy");

	// }, 5000);

	// return dfd.promise;

	return new Bluebird.Promise(function(resolve, reject) {
		setTimeout(function() {
			resolve("boom");
		}, 5000);
	});

};

server.connection({ port: 3000 });

server.route({
  method: 'GET',
  path: '/yo',
 //  handler: function(req, rsp) {
 //    const resp = new twilio.TwimlResponse();
 //    resp.message(dispatcher(req.query.Body));
	// console.log("Request is ", req.query.Body);
 //    rsp(resp.toString()).type('text/xml');
 //  }
   handler: function(req, reply) {

   	const resp = new twilio.TwimlResponse();

   	reply(tsAPI.getStatus()
   			.then(function(status) {
   				console.log("Then fired with ", status);
    			resp.message(status);
    			return status.toString().type('text/xml');
   			}));

  }
});

server.start((err) => {
	if (err) {
		throw err;
	}
	console.log(`Server running at: ${server.info.uri}`);
});

// function dispatcher(req) {
// 	const _req = req.toLowerCase();
// 	if (_req === 'status') {

// 		tsAPI.getStatus()
// 			.then();

// 		return "You've been clocked in for XHRSXXMINS";
// 	} else if (_req === "clockout" || _req === "clock out") {
// 		return "Successfully clocked out.";
// 	} else if (_req === "clockin" || _req === "clock in") {
// 		return "Clocked in!";
// 	} else {
// 		return "I'm sorry I don't know that one.";
// 	}
// }    return tsAPI.getStatus()
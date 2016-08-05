'use strict;'

const Hapi = require('hapi');
const server = new Hapi.Server();
const twilio = require('twilio');
const q = require('q');

const tsAPI = {};

tsAPI.getStatus = function(req) {

	const dfd = q.defer();

	setTimeout(function() {

		const resp = new twilio.TwimlResponse();
		resp.message(dispatcher(req.query.Body));
		dfd.resolve(resp.toString());

	}, 5000);

	return dfd.promise;

};

server.connection({ port: 3000 });

server.route({
  method: 'GET',
  path: '/yo',
   handler: function(req, reply) {

   	const resp = new twilio.TwimlResponse();

	reply(tsAPI.getStatus(req)).type('text/xml');

  }
});

server.start((err) => {
	if (err) {
		throw err;
	}
	console.log(`Server running at: ${server.info.uri}`);
});

function dispatcher(req) {
	const _req = req.toLowerCase();
	if (_req === 'status') {

		tsAPI.getStatus()
			.then();

		return "You've been clocked in for XHRSXXMINS";
	} else if (_req === "clockout" || _req === "clock out") {
		return "Successfully clocked out.";
	} else if (_req === "clockin" || _req === "clock in") {
		return "Clocked in!";
	} else {
		return "I'm sorry I don't know that one.";
	}
}    return tsAPI.getStatus()
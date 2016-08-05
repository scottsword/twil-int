'use strict;'

const Hapi = require('hapi');
const server = new Hapi.Server();
const twilio = require('twilio');

server.connection({ port: 3000 });

server.route({
  method: 'GET',
  path: '/yo',
  handler: function(req, rsp) {
    const resp = new twilio.TwimlResponse();
    resp.message("OMG bro");
    rsp(resp.toString()).type('text/xml');
  }
});

server.start((err) => {
	if (err) {
		throw err;
	}
	console.log(`Server running at: ${server.info.uri}`);
});
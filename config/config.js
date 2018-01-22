const path = require('path');

module.exports = {
    env: process.env.NODE_ENV || 'development',
    appPort: process.env.PORT || 8080,
	
    apiUrl: 'https://api.foursquare.com/v2',
    clientId: 'get your client ID', //https://developer.foursquare.com/places-api
    clientSecret: 'get your client clientSecret',
	
	mapsClientId: 'get your client',
	mapsUrl: 'http://maps.google.com/maps/'
};

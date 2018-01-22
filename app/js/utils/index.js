var getLocation = require('./location.js');
var config = require('../../../config/config.js')

export function getCoords() {
	return new Promise(function (resolve, reject) {
		navigator.geolocation.getCurrentPosition(resolve, reject, getLocation.options);
	});
}


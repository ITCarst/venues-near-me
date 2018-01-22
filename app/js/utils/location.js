/**
* Get user current location based on navigator location
* @return {object} - latitude, longitude, acc
**/
var getLocation = {
	options: {
	  	enableHighAccuracy: true,
	  	timeout: 50000,
	  	maximumAge: 0
	},
	success: function (location) {
		var { latitude, longitude, accuracy } = location.coords;

		return {
			lat: latitude,
			long: longitude,
			acc: accuracy
		};
	},
	error: function (err) {
		console.warn(`ERROR(${err.code}): ${err.message}`);
	}
};

module.exports = getLocation;
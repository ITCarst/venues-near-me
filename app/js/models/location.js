var services = require('../services/index.js');
var config = require('../../../config/config.js');

/**
* Constructor that creates the location, maps and venues
* @param {object} - location coordinates lat, lng
*/
function Location(location) {	
	this.config = {
		coord: {
			lat: location.lat || 52.402131, 
			lng: location.long || 5.2818644
		},
		zoom: 15,
		marker: null,
		radius: 900
	}
}

/**
* Builds a google maps, based on user coord
* @param {object} - HTML element where the map will be placeed
*/
Location.prototype.buildMap = function(wrarpper) {
	var {lat, lng} = this.config.coord, geolocate = new google.maps.LatLng(lat, lng), infowindow;
	
	this.map = new google.maps.Map(wrarpper, {
		center: {lat: lat, lng: lng},
		zoom: this.config.zoom
	});

	infowindow = new google.maps.InfoWindow({
    	map: this.map,
    	position: geolocate,
    	maxWidth: 150,
    	content: '<h3>Your location!</h3>'
	});
} 

/**
* Retrieve a Foursquare Venue.
* @param {String} - venueId The id of a Foursquare Venue.
* @return {Promise} - returns a promise with the found venues
*/
Location.prototype.getVenues = function(location) {
	var uri = `${config.apiUrl}/venues/explore?ll=${location.lat || this.config.coord.lat}, ${location.long || this.config.coord.lng}
			&client_id=${config.clientId}
			&client_secret=${config.clientSecret}&radius=${location.radius || this.config.radius}&v=20130619`;
	var self = this;

	return services.get(uri)
		.then(function(venues) {
			venues = venues['response']['groups'][0]['items'];
			self.setVenuesMarkers(venues);

			return venues;
		})
		.catch(err => {
			console.log(err)
		});
}

/**
* Set's google map markers on the map with the found venues
* @param {Object} - found venues.
*/
Location.prototype.setVenuesMarkers = function(venues) {
	var self = this, markers = [], contents = [], infowindows = [];

	venues.forEach(function(venue, i) {
		var lat = venue['venue']['location']['lat'], lng = venue['venue']['location']['lng'],
			position = new google.maps.LatLng(lat, lng);

		markers[i] = new google.maps.Marker({
	        position: position,
	        map: self.map,
	        title: 'samplemarker'
	    });
	    infowindows[i] = new google.maps.InfoWindow({
		    maxWidth: 300
	    });

		self.venueInfo(markers[i], infowindows[i]);
	});
}

Location.prototype.venueInfo = function(marker, infoWindow) {
    google.maps.event.addListener(marker, 'click', function() {
        infoWindow.open(this.map, marker);
        this.map.panTo(marker.getPosition());
	});  
}


/**
* Set's location in the map based on selected venue
* @param {string} - Clicked li element which returns venue ID.
*/
Location.prototype.getSelectedVenue = function(venue) {
	var {lat, lng, address, postalCode} = venue.location;
	var position = new google.maps.LatLng(lat, lng);
	var marker = new google.maps.Marker({
        position: position,
        map: this.map,
        title: venue.id
    });

    this.map.panTo(marker.getPosition());
    this.closeInfoWindow(marker);
	
	this.marker = marker;
	this.marker.infoWindow = new google.maps.InfoWindow({
	    content: `<b>${venue.name}</b> </br> ${address}`,
	    maxWidth: 300
    });
    this.marker.infoWindow.open(this.map, marker);
} 


/**
* Matches the opend marker to colse it and open the selecTed one
* @parma {String} - venue id
*/
Location.prototype.closeInfoWindow = function(marker) {
	if (!this.marker || !this.marker.title) return false
	if (this.marker !== marker.title) this.marker.infoWindow.close();
}

module.exports = Location;
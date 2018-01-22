var utils = require('../utils/index.js');
var Location = require('../models/location.js');
var Header = require('./Header.js');
var LeftPanel = require('./LeftPanel.js');

/**
* Main HTML container that holders the rendering of the children
* required only once by the index 
* sends the main wrapper where the layout will be renderd  
*/
function MainContainer(location) {
	this.header = new Header();
	this.leftPanel = new LeftPanel();
	this.location = new Location(location);
	
	this.userLoc = location;
	this.content = document.createElement('div');
	this.content.className = "content";
	this.selected = null;
};

/**
* Initializaer of the app
* @param {Object} - parent html element.
*/
MainContainer.prototype.init = function(wrapper) {
	if (!wrapper) return "Please define an HTML container";
	this.wrapper = wrapper;

	this.getUserLocation();
}

/**
* Render the main containers of the wrapper.
* Header, Content, Footer
*/
MainContainer.prototype.renderLayout = function () {	
	this.header = this.header.render("Header");
	this.leftPanel = this.leftPanel.render("LeftPanel");

	var slider = this.createRadius();
	this.wrapper.appendChild(this.header);
	this.wrapper.appendChild(this.leftPanel);
	this.wrapper.appendChild(this.content);
}

/**
* Render user location based on api.
*/
MainContainer.prototype.getUserLocation = function() {
	var map = this.location.buildMap(this.content);
	var venues = this.location.getVenues(this.location);

	venues.then((data) => {
		this.renderVenuesInfo(data);
	})
	.catch(err => {
		console.log(err)
	})
}

/**
* Renders the found venues into the left pannel as a listing with click event
* @parma {Object} - venues from api
*/
MainContainer.prototype.renderVenuesInfo = function(venues) {
	var ulEl = document.createElement('ul'), self = this;
	ulEl.className = "venue-col";

	venues.forEach(function(venue, i) {
		venue = venue['venue'];
		var cat = venue['categories'][0], x = 0, catLength = cat.length,
			liEl = document.createElement('li'),
			photo = document.createElement('div'),
			title = document.createElement('div'), 
			ratings = document.createElement('div');

		liEl.className = "venue-row venue_" + venue.id;

		liEl.onclick = function(event) {
    		var target = setRowClick(event, venue);
		};

		photo.className = "venue-photo";
		photo.innerHTML = "Photo";

		title.className = "venue-name";
		title.innerHTML = venue['name'];
		
		ratings.className = "vanue-ratings";
		ratings.innerHTML = 'Rating: ' + (venue.rating || 'No ratings.');

		liEl.appendChild(photo);
		liEl.appendChild(title);
		liEl.appendChild(ratings);

		ulEl.appendChild(liEl);
	});

	function setRowClick(e, venue) {
		e.preventDefault();

		var target = e.target || e.srcElement;

		if (!target.parentElement.className.match(/row/i)) return false;

		self.setClickedLocation(target.parentElement, venue);
		self.selected = target.parentElement.className;
	}

	this.leftPanel.appendChild(ulEl);
}


MainContainer.prototype.setClickedLocation = function(target, venue) {
	var venueId = target.className.replace(/venue-row venue_/ig, '');
	var venue = this.location.getSelectedVenue(venue);

	if (this.selected && this.selected !== target.className) {
		var selected = document.getElementsByClassName(this.selected)[0];
		selected.classList.remove('selected');
	}
	target.classList.add("selected");
}


/**
* Create an input range which will be appended to the header to control the radius of the venues
* Triggeres the ajax call with the radius input
*/
MainContainer.prototype.createRadius = function() {
	var radiusEl = document.createElement('div');
	var self = this;
	radiusEl.className = "radiusHolder";

	var radiusTxt = document.createElement('div');
	radiusTxt.innerHTML = "Change radius:";
	radiusTxt.className = "valueChange";
	radiusEl.appendChild(radiusTxt);

	var input = document.createElement('input');
	input.className = "radius-input";
	input.setAttribute('type', 'range');
	input.setAttribute('min', this.location.config.radius);
	input.setAttribute('max', '1500');
	input.setAttribute('step', '10');

	radiusEl.appendChild(input);
	this.header.appendChild(radiusEl);

	input.oninput = function() {
		radiusTxt.innerHTML = "Change: radius: " + this.value;
		self.userLoc.radius = this.value

		var venues = self.location.getVenues(self.userLoc);
	}
}

module.exports = MainContainer;

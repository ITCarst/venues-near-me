var utils = require('./utils/index.js');
var location = require('./utils/location.js');
var MainContainer = require('./containers/main.js');

(function() {

	/**
	* Main entry point for the application using an constructor 
	*/
	function App() {
		this.init = function(position) {
			this.wrapper = document.querySelector(".wrapper");
			this.location = location.success(position);

			return (this.location) ? this.render() : this.renderFail("Something went wrong");
		}

		this.render = function() {
			this.mainContainer = new MainContainer(this.location);
			this.mainContainer.init(this.wrapper);
			this.mainContainer.renderLayout();
		}

		this.renderFail = function(err) {
			this.wrapper.innerHTML = err;

			return new Error();
		}
	}
	
	window.onload = function() {
		var app = new App();

		utils.getCoords()
			.then((position) => {
				app.init(position);
			})
			.catch((err) => {
				app.renderFail(err);
			});
	}
	
}(window));

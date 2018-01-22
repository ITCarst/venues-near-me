function Header() {};

/**
* Create an header element which will be renderd in the main container as the header of the app
* @return {element} - header elememt
*/
Header.prototype.render = function (text) {
	const header = document.createElement('header');
	header.innerHTML = text;

	return header;
}

module.exports = Header;

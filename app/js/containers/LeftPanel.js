function LeftPanel() {};

/**
* Create an div element which will be renderd in the main container as the left panel of the app
* @return {element} - header elememt
*/
LeftPanel.prototype.render = function (text) {
	const leftPanel = document.createElement('div');
	leftPanel.className = "left-panel";
	
	return leftPanel;
}

module.exports = LeftPanel;

var config = require('../../../config/config.js');

export function doAuth() {
	var redirect = window.location.href.replace(window.location.hash, '');
    var url = config.apiUrl + 'oauth2/authenticate?response_type=token&client_id=' + config.clientId +
        '&redirect_uri=' + encodeURIComponent(redirect) +
        '&state=' + encodeURIComponent($.bbq.getState('req') || 'users/self');
        
    window.location.href = url;
}
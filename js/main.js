'use strict';
const clearStorage = () => {
	localStorage.clear();
	initLocalStorage();
}

window.onload = function() {
	clearStorage();
};

const axios = require('axios');
const url = 'https://kydev-zen-manga-data-api.herokuapp.com/tomochanWaOnnanoko';


$(window).onload = function() {
	axios.get(url).then((res) => {
		var imgOne = res.pages[0].imgSrc;
		var img = document.querySelector('#img-output');
		img.src = imgOne;


	});
};

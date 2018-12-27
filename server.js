var express = require('express');
const hbs = require('hbs');

const port = process.env.PORT || 3000;
var app = express();

let animeLibData = require('./public/api-data/anime-cafe-lib.json');

hbs.registerPartials(__dirname + '/views');
app.set('view engine', 'hbs');


// Mainenance Page Activator
// (INFO: Comment out to deactivate Maintenance Page - Uncomment to activate it)

// app.use((req,res,next) => {
// 	res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/'));

app.get('/', (req, res) => {
  res.render('home.hbs', {
		pageTitle: 'KY Radio',
    subTitle: '~ Home ~'
	});
});

app.get('/api/anime-cafe', (req, res) => {
	let data = animeLibData;

	// let query = req.params.seriesname;

	res.send({
        data: data
    });
	
});
//
// app.get('/api/:apiID/:query', (req, res) => {
//     var id = req.params.id;
//     if (id === 'anime-live-irc-1') {
//         res.render('yt-player.hbs', {
//             vidTitle: "Kawaii Anime Music Live IRC",
//             vidurl: "https://www.youtube.com/embed/PRlAY486hVg?rel=0&amp;showinfo=0"
//         });
//     } else if (id === 'anime-live-irc-2') {
//         res.render('yt-player.hbs', {
//             vidTitle: "Anime Music Live IRC",
//             vidurl: "https://www.youtube.com/embed/BgZ7hJore2w?rel=0&amp;showinfo=0"
//         });
//     }
// });



app.listen(port, () => {
  console.log(`Started on port ${port}`);
});

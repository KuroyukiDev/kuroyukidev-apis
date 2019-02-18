var express = require('express');
var bodyParser = require('body-parser');
const osrs = require('osrs-wrapper');
const hbs = require('hbs');

const port = process.env.PORT || 3000;
var app = express();

let animeLibData = require('./public/api-data/anime-cafe-lib.json');

hbs.registerPartials(__dirname + '/views');
app.set('view engine', 'hbs');
app.use(bodyParser.json());

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
	let dataJSON = animeLibData;

	// let query = req.params.seriesname;
    let dataStr = JSON.stringify(dataJSON, null, 2);

	res.send({
        data: JSON.parse(dataStr)
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

app.get('/api/osrs/ge/:term', (req, res) => {
	const term = req.params.term;
	
	osrs.ge.getItem(term)
      .then((response) => {
         const data = JSON.parse(response);
		console.log("Response: ", data);
         res.send(data).status(200);
      })
      .catch(() => {
         res.send('Item Not Found').status(404);
      });
});

app.listen(port, () => {
  console.log(`Started on port ${port}`);
});

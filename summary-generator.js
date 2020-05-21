const express = require('express');
const mwn = require('mwn');

const app = express();
app.use(express.json());

const port = 3000;

const bot = new mwn({ apiUrl: 'https://en.wikipedia.org/w/api.php' });

const TextExtractor = require('./TextExtractor')(bot);

bot.getSiteInfo().then(() => {

	app.get('/api', (req, res) => {
		if (req.query.article) {
			bot.read(req.query.article).then(data => {
				var text = data.revisions[0].content;
				res.send(TextExtractor.getExtract(text));
			});
		}
	});
	app.post('/api', (req, res) => {
		if (req.query.article) {
			bot.read(req.query.article).then(data => {
				var text = data.revisions[0].content;
				res.send(TextExtractor.getExtract(text));
			});
		} else if (req.body.wikitext) {
			res.send(TextExtractor.getExtract(req.body.wikitext));
		}
	});
	
	app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));

});
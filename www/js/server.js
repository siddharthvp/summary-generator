const express = require('express');
var cors = require('cors');
const mwn = require('mwn');

const app = express();
app.use(express.json());
app.use(cors());

const port = parseInt(process.env.PORT, 10);

const bot = new mwn({ apiUrl: 'https://en.wikipedia.org/w/api.php' });

const TextExtractor = require('../../TextExtractor')(bot);

var handleRequest = (req, res) => {
	var params = Object.assign({}, req.query, req.body);
	if (params.article) {
		bot.read(params.article).then(data => {
			var text = data.revisions[0].content;
			res.send(TextExtractor.getExtract(text, params.charLimit, params.hardUpperLimit));
		});
	} else if (params.wikitext) {
		res.send(TextExtractor.getExtract(params.wikitext, params.charLimit, params.hardUpperLimit));
	}
};

bot.getSiteInfo().then(() => {

	app.get('/api', (req, res) => {
		handleRequest(req, res);
	});
	app.post('/api', (req, res) => {
		handleRequest(req, res);
	});
	
	app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));

});
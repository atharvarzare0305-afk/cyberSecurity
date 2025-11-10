const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const scanner = require('./scanner');


const app = express();
app.use(cors());
app.use(bodyParser.json());


app.post('/api/scan', async (req, res) => {
try {
const { target } = req.body;
if (!target) return res.status(400).json({ error: 'target is required' });


// Normalize URL
let url = target;
if (!/^https?:\/\//i.test(url)) url = 'http://' + url;


const report = await scanner.runAllChecks(url);
res.json({ target: url, report });
} catch (err) {
console.error(err);
res.status(500).json({ error: 'internal error', message: err.message });
}
});


// Serve frontend static files (if you copy frontend into backend/public)
app.use('/', express.static('../frontend'));


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Scanner backend listening on port ${PORT}`));
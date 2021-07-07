const express = require("express");
const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.static(__dirname + '/sandbox'));
app.use('/dist', express.static(__dirname + '/dist'));
app.get('/', (req, res) => { res.sendFile(__dirname + '/sandbox/index.html'); });

app.listen(PORT, () => {
  console.log(`Development server listening on http://localhost:${PORT}/`)
});
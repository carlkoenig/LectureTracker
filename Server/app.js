const express = require('express');
const config = require('./config')

const app = express();

app.get('/', function(req, res) {
    res.send('Hello World!')
});

app.listen(config.port, () => {
    console.log(`Listening on port: ${config.port}`)
})

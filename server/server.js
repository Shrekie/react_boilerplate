/*
    Node express entry point
*/

// Config imports
const env_config = require('./config/envConfig.js');
require('./config/dbConnect.js');

// Service package imports
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

// Route imports
const application = require('./routes/application');

var app = express();
app.set('trust proxy', true);

// Middleware
// Parse requests as json and encode urls
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Expose public sources
app.use(express.static(__dirname + '/../dist/'));

// Register application routes
app.use(application);

// Static routes
app.get('/error', (req, res) => {
    res.send('Something went wrong.');
});

app.get('/*', (req, res) => {
    res.sendFile(path.resolve('./dist', 'index.html'));
})

// Initialize server
if(env_config.env == 'development'){
	require('./config/devServer.js').createDevServer(app).listen(process.env.PORT, () => {
        console.log("Development server started at " + process.env.PORT);
    });
}else{
	app.listen(process.env.PORT, '0.0.0.0', () => {
	    console.log('Started on port ', process.env.PORT);
	});
}
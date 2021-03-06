// Simulate config options from your production environment by
// customising the .env file in your project's root folder.
require('dotenv').config();

// Require keystone
var debug = require('debug')('keystone');
var keystone = require('keystone');
const name = 'nikaapp keystone'
debug('booting %s', name)
// Initialise Keystone with your project's configuration.
// See http://keystonejs.com/guide/config for available options
// and documentation.
var agenda = require('./lib/agenda/agenda');

keystone.init({
	'name': 'NIKAapp',
	'brand': 'NIKAapp',

	'admin path': 'admin',
	'sass': 'public',
	'static': 'public',
	'favicon': 'public/favicon.ico',
	'views': 'templates/views',
	'view engine': 'jade',
	'auto update': true,
	'session': true,
	'auth': true,
	'user model': 'User',
	'cookie secret': process.env.COOKIE_SECRET,

});

// Load your project's Models
keystone.import('models');

// Setup common locals for your templates. The following are required for the
// bundled templates and layouts. Any runtime locals (that should be set uniquely
// for each request) should be added to ./routes/middleware.js
keystone.set('locals', {
	_: require('lodash'),
	env: keystone.get('env'),
	utils: keystone.utils,
	editable: keystone.content.editable,
});

// Load your project's Routes
keystone.set('routes', require('./routes'));

// Configure the navigation bar in Keystone's Admin UI
// keystone.set('nav', {
// 	tasks: 'tasks',
// 	decisions: 'decisions',
// 	decisions: 'decisions',
// });

// Start Keystone to connect to your database and initialise the web server
keystone.start(function(){
	keystone.debug = debug;
	keystone.agenda = agenda(['emailNotification']);
});

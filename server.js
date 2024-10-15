const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');

const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const routes = require('./controllers');
const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({  });

// Inform Express.js on which template engine to use
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.use(
	session({
	  secret: process.env.SESSION_SECRET,
	  store: new SequelizeStore({
		db: sequelize,
	  }),
	  saveUninitialized: false,
	  resave: false, // we support the touch method so per the express-session docs this should be set to false
	  // proxy: true, // if you do SSL outside of node.
	  // Only send a cookie that cannot be accessed by Browser JS
	  cookie: {
		httpOnly: true
	  }
	})
  );

// turn on routes
app.use(routes);

// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});

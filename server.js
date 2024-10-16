require('dotenv').config();

const express = require('express');
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const path = require('path');

const client = require('./config/connection');
const routes = require('./controllers');
// const sequelize = require('./config/connection');


//CREATE SERVER
const app = express();
const PORT = process.env.PORT || 3001;

// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({  });

// Inform Express.js on which template engine to use
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

//Allow other request types through forms
app.use(methodOverride('_method'));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.use(
	session({
	  secret: process.env.SESSION_SECRET,
	  store: new SequelizeStore({
		db: client,
	  }),
	  saveUninitialized: false,
	  resave: false, 
	  proxy: true, 
	  cookie: {
		httpOnly: true // sends a secure cookie that cannot be accessed by browser JS
	  }
	})
  );

// turn on routes
app.use(routes);

// turn on connection to db and server
client.sync({ force: false })
  .then(() => {
    app.listen(PORT, () => {
      console.log('Server started on port', PORT);
    });
  }); 
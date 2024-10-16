require('dotenv').config();

console.log('Environment Variables:');
console.log('PG_URL:', process.env.PG_URL);


const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');

const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const routes = require('./controllers');
// const sequelize = require('./config/connection');
const client = require('./config/connection');

//CREATE SERVER
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
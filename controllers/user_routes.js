const router = require('express').Router();
const { User} = require('../models');



  // Register a user
router.post('/register', async (req, res) => {
	console.log('register route');
	try {
	  const userData = await User.create(req.body);
	  
	  req.session.user_id = userData.id;

	  res.redirect('/search'); //triggers get request (maybe change later to favorites pages)
	} catch (err) {
	  res.status(400).json(err);
	}
  });

  // Log In User
router.post('/login', async (req, res) => {
	const formData = req.body;
	// Grap the user by the form email that was provided
	const user = await User.findOne({
	  where: {
		email: formData.email
	  }
	});
  
	// If they do not exist in the database, then stop everything and redirect them to register
	if (!user) {
	  req.session.errors = ['A user with that email address does not exist'];
	  return res.redirect('/register');
	}
  
	// Check to see if they gave us the correct password
	const valid_pass = await user.validatePassword(formData.password);
  
	if (!valid_pass) {
	  req.session.errors = ['Password is invalid'];
	  return res.redirect('/login');
	}
  
	// Log in the user by creating a session
	req.session.user_id = user.id;
  
	// Ensuring that the session data has been saved before we redirect them
	req.session.save((err) => {
	  if (err) return console.log('session error', err);
  
	  res.redirect('/search');
	});
  });

  router.get('/logout', (req, res) => {
	req.session.destroy();
	res.redirect('/');
  })

  module.exports = router;
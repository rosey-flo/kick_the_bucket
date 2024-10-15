const router = require('express').Router();

const { User, Favorite } = require('../models');

function redirectGuest(req, res, next) {
  if (!req.session.user_id) {
    return res.redirect('/login');
  }

  next();
}

function redirectUser(req, res, next) {
	if (req.session.user_id) {
	  return res.redirect('/search');
	}
  
	next();
  }

router.get('/', redirectUser, async (req, res) => {
  res.render('homepage')
})

router.get('/register', redirectUser, async (req, res) => {
  res.render('register');
});

router.get('/login', redirectUser, async (req, res) => {
  res.render('login');
});

router.get('/list', redirectGuest, async (req, res) => {
    const user = await User.findByPk(req.session.user_id, {
      attributes: ['username'],
      include: Favorite
    });
  
    res.render('list', {
      user: user.get({ plain: true }),
      title: 'My Bucket List - Favorites',
      user_page: true,
      favorites: true
    });
  });

router.get('/search', redirectGuest, async (req, res) => {

  const user = await User.findByPk(req.session.user_id);

  res.render('search', {
    user: user.get({
      plain: true
    }),
	search: true
  });
});

function redirectGuest(req, res, next) {
  if (!req.session.user_id) {
      return res.redirect('/login');
  }
  next();
}

router.get('/favorites', redirectGuest, async (req, res) => {
  const user = await User.findByPk(req.session.user_id, {
    include: Favorite
  });

  res.render('favorites', {
    user: user.get({ plain: true }),
    title: 'My Destinations - Favorites',
    user_page: true,
    favorites: true
  });
});

module.exports = router;

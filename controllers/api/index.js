const router = require('express').Router();
const favoriteRoutes = require('./favorite_routes');


router.use('/favorites', favoriteRoutes);


module.exports = router;
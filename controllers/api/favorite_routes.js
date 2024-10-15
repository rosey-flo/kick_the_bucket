const router = require('express').Router();
const { Favorite } = require('../../models');

router.post('/', async (req, res) => {
  const data = req.body;
  console.log(req.body);
  await Favorite.create({
    country_name: data.country,
    city_name: data.city,
    landmark_name: data.landmark,
    state_name: data.state,
    userId: req.session.user_id
  });

  res.json({
    message: 'Favorited added.'
  });
});


// Delete Favorite
router.delete('/unfav/:id', async (req, res) => {
  const id = req.params.id;

  await Favorite.destroy({
    where: {
      id: id
    }
  });

  res.json({
    message: 'Fav removed successfully!'
  });
});

module.exports = router

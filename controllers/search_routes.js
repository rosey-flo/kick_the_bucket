const router = require('express').Router();


router.post('/search', async (req, res) => {
    console.log('form results')
    res.render('search_results', req.body)
})

module.exports = router
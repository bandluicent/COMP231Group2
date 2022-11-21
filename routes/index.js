var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Luis Bandres',
    section:'Home',
    userName: req.user ? req.user.username : ''});
});

/* GET newsfeed page. */
router.get('/newsfeed', function(req, res, next) {
  res.render('newsfeed', { 
    title: 'Luis Bandres',
     section:'NewsFeed',
     userName: req.user ? req.user.username : ''});
});


module.exports = router;

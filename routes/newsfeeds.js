var express = require('express');
var router = express.Router();

let newsfeedsController = require('../controller/newsfeeds');

// Connect to our model
let NewsFeed = require('../models/newsfeeds');


// helper function for guard purposes
function requireAuth(req, res, next)
{
    // check if the user is logged in
    if(!req.isAuthenticated())
    {
        req.session.url = req.originalUrl;
        return res.redirect('/users/signin');
    }
    next();
}


/* GET list of items */
router.get('/list', requireAuth, newsfeedsController.newsfeedsList);


// Routers for edit
router.get('/edit/:id', requireAuth, newsfeedsController.displayEditPage);
router.post('/edit/:id', requireAuth, newsfeedsController.processEditPage);


// Delete
router.get('/delete/:id', requireAuth, newsfeedsController.performDelete);


// /* GET Route for displaying the Add page - CREATE Operation */
router.get('/add', requireAuth, newsfeedsController.displayAddPage);

// /* POST Route for processing the Add page - CREATE Operation */
router.post('/add', requireAuth, newsfeedsController.processAddPage);

module.exports = router;
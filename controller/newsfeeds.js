let NewsFeedModel = require('../models/newsfeeds');

function getErrorMessage(err) {
    console.log("===> Error: " + err);
    let message = '';
    
    if (err.code) {
      switch (err.code) {
        default:
          message = 'Something went wrong';
      }
    } else {
      for (var errName in err.errors) {
        if (err.errors[errName].message) message = err.errors[errName].message;
      }
    }
  
    return message;
  };

module.exports.newsfeedsList = function(req, res, next) {  
    NewsFeedModel.find((err, newsfeedsList) => {
        if(err)
        {
            return console.error(err);
        }
        else
        {
            res.render('newsfeeds/list', {
                title: 'News Feeds',
                section: 'NewsFeed',
                NewsFeedList: newsfeedsList,
                userName: req.user ? req.user.username : ''
            })            
        }
    });
}

module.exports.displayEditPage = (req, res, next) => {
    
    let id = req.params.id;

    NewsFeedModel.findById(id, (err, itemToEdit) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            res.render('newsfeeds/add_edit', {
                title: 'Edit NewsFeed', 
                section: 'NewsFeed',
                messages: req.flash('error'),
                item: itemToEdit,
                userName: req.user ? req.user.username : ''
            })
        }
    });
}

module.exports.processEditPage = (req, res, next) => {

    let id = req.params.id

    let updatedItem = NewsFeedModel({
        _id: req.params.id,
        subject: req.body.subject,
        text: req.body.text
    });

    NewsFeedModel.updateOne({_id: id}, updatedItem, (err) => {
        if(err)
        {
            let message = getErrorMessage(err);
            req.flash('error', message);
            return res.render('newsfeeds/add_edit', {
                        title: 'Edit NewsFeed',
                        section: 'NewsFeed',
                        messages: req.flash('error'),
                        item: updatedItem,
                        userName: req.user ? req.user.username : ''
            });
        }
        else
        {
            res.redirect('/newsfeeds/list');
        }
    });

}

module.exports.performDelete = (req, res, next) => {

    let id = req.params.id;


    NewsFeedModel.remove({_id: id}, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            res.redirect('/newsfeeds/list');
        }
    });

}


module.exports.displayAddPage = (req, res, next) => {

    let newItem = NewsFeedModel();

    res.render('newsfeeds/add_edit', {
        title: 'Add a new NewsFeed',
        section: 'NewsFeed',
        messages: req.flash('error'),
        item: newItem,
        userName: req.user ? req.user.username : ''
    })          

}

module.exports.processAddPage = (req, res, next) => {

    let newItem = NewsFeedModel({
        _id: req.body.id,
        subject: req.body.subject,
        text: req.body.text
    });
    NewsFeedModel.create(newItem, (err, item) =>{
        if(err)
        {
            let message = getErrorMessage(err);
            
            req.flash('error', message);
            return res.render('newsfeeds/add_edit', {
                        title: 'Add a new NewsFeed',
                        section: 'NewsFeed',
                        messages: req.flash('error'),
                        item: newItem,
                        userName: req.user ? req.user.username : ''
            });
        }
        else
        {
            console.log(item);
            res.redirect('/newsfeeds/list');
        }
    });
    
}
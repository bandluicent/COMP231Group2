let mongoose =  require('mongoose');

let NewsFeedModel = mongoose.Schema(
    {
        subject: String,
        text: String
    },
    {
        collection: "newsfeedList"
    }
);

module.exports = mongoose.model('NewsFeed',NewsFeedModel);
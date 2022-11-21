
let atlasDB = "mongodb+srv://bandluicent:ldUywgUcW9833bD9@cluster0.isxz0.mongodb.net/comp_231_db?retryWrites=true&w=majority"

let mongoose = require('mongoose');

module.exports = function(){
    mongoose.connect(atlasDB);
    let mongoDb = mongoose.connection;

    mongoDb.on('error', console.error.bind(console, 'Connection Error:'));
    mongoDb.once('open', ()=>{
        console.log('Connected to MongoDB...');
    })

    return mongoDb;
}
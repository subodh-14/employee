const mongoose = require('mongoose')

var PostMessage = mongoose.model('PostMessage',
{
    
    name : {type:String},
    age: {type:String},
    bio:{type:String}
},'postMessages')

module.exports = { PostMessage}
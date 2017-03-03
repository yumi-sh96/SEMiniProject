var mongoose = require('mongoose');

var clientSchema = mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
})

var Client = mongoose.model("client", clientSchema);

module.exports = Client;
var mongoose = require('mongoose');


var portofolioSchema = mongoose.Schema({

    studentName:{
        type: String,
        required: true
    },

    profilePicPath: {
        type: String,
        default:'../uploads/default.jpg'
    },

    projectsURL: [
        {
            type: String,
            required: true

        }
    ],

    studentUsername: {
        type: String
    }
});

var Portofolio = mongoose.model("portofolio", portofolioSchema);

module.exports = Portofolio;
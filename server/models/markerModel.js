const mongoose = require('mongoose');

const markerSchema = new mongoose.Schema({
    mark: {
        type: Boolean,
        default: true,
    },
    date: {
            type: Date,
            required: [true, "Please select the date"]
    },
    userid: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    
   
}, {
    timestamps: true
});


const Mark = mongoose.model('Mark', markerSchema); 

module.exports = { Mark };
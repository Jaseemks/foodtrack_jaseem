const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type:String,
        required : [true, "Please enter the pickup date"],
    },
    password: {
        type:String,
        required: [true, "Please enter the pickup date"],
        trim:true,
    },
    phone: String,
    profilepic:{
        type : String,
        default:"https://st3.depositphotos.com/9998432/13335/v/450/depositphotos_133352010-stock-illustration-default-placeholder-man-and-woman.jpg",
    },
})

const User = mongoose.model('User',userSchema)

module.exports = {User};
const mongoose= require('mongoose')

//Creating person prototype
const person = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    age : Number,
    favoriteFoods : [String]

})

module.exports=  mongoose.model('Person', person);
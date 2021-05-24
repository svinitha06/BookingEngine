
const mongoose = require('mongoose');

const countersSchema= new mongoose.Schema({
 
    count:{
        type: Number,
        required:false
    },
    
    field:{
        type: String,
        required:false
 
    }
})
 
module.exports =counters = mongoose.model('counters',countersSchema);



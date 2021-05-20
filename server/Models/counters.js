require('../db/mongoose');
const countersSchema= new mongoose.Schema({
 
    count:{
        type: Number,
        required:true
 
    },
 
    model:{
        type: String,
        required:true
 
    },
 
    field:{
        type: String,
        required:true
 
    }
})
 
module.exports=counters=mongoose.model('counters',countersSchema);



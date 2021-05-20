require('../db/mongoose');
const IdentityCountersSchema= new mongoose.Schema({
 
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
 
module.exports=IdentityCounter=mongoose.model('IdentityCounter',IdentityCounterSchema);



const mongoose=require('mongoose');
const rateMasterSchema=new mongoose.Schema({
 
 
    PropertyId:{
        type: Number,
        required:true
        
    },
    
    roomType:{
       type: String,
       required:true
    },

   
    fromDate:{
    type:Date,
    required:true,
    default:Date.now
},

 toDate:{
    type:Date,
    required:true,
    default:Date.now
},
perDayRate:{
    type: Number,
    required:true
},

plan:{
    type : String,
    required:true
}

    
})


module.exports=rateMaster=mongoose.model('rateMaster',rateMasterSchema);

const mongoose=require('mongoose');
const rateMasterSchema=new mongoose.Schema({

    roomTypeId:{
        type: Number,
        required: false
    },

    roomType:{
       type: String,
       required: false
    },

   
    fromDate:{
    type:Date,
    required:false,
    default:Date.now
    },

    toDate:{
    type:Date,
    required:false,
    default:Date.now
    },

    perDayRate:[{
    type: Number,
    required:false
    }],

    plan:[{
    type : String,
    required:false
    }]

    
})


module.exports=RateMaster=mongoose.model('RateMaster',rateMasterSchema);


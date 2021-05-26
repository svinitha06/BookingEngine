const mongoose=require('mongoose');
const RateMasterSchema = new mongoose.Schema({

    roomTypeId:{
        type: String,
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


module.exports = Rate = mongoose.model('Rate', RateMasterSchema);


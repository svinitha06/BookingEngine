const mongoose=require('mongoose');

const roomTypeMasterSchema=new mongoose.Schema({

    PropertyId:{
        type: Number,
        required:false,
        unique:false
    },
    
    roomType:{
       type: String,
       required:false
    },

    roomImage:{
       type= String
    },
    
    description:{
      type:String,
      required:false
    },

    numberofRooms:{
         type: Number,
        required:false

    }
})

module.exports=roomTypeMaster=mongoose.model('roomTypeMaster',roomTypeMasterSchema);
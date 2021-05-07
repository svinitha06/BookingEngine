const mongoose=require('mongoose');

const propertyMasterSchema=new mongoose.Schema({

    PropertyId:{
        type: Number,
        required:true,
        unique:true
    },
    
    name:{
       type: String,
       required:true
    },

    location:{
       type= String
    },
    
    description:{
      type: Number,
      required:true
    },
    star:{
        type:String

    },
    website:{
        type:String,
        required:true

    }

    
})

module.exports=propertyMaster=mongoose.model('propertyMaster',propertyMasterSchema);
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
       type: String,
       required: true
      },
    
    description:{
      type: String,
      required:true
    },
    
    logo:{
        type: String,
        required:true 
    },  

    ratings:{
        type: String

    },
    
    website:{
        type: String,
        required:true

    },

    contact:{
        type: Number,
        required: true
    },

    Address:{
        type: String,
        required: true
    }
})

module.exports=propertyMaster=mongoose.model('propertyMaster',propertyMasterSchema);
const mongoose=require ("mongoose");

const bookFormSchema= new mongoose.Schema({

    propertyId:{
         type: Number,
        required:false

    },

    roomType:{
         type: String,
        required:false

    },

    guestName:{
         type: String,
        required:false

    },
    mobile:{ 
        type: Number,
        required:false,
        unique:true,
        min: 10
    },
    email:{
        type: String,
        required:false,
        unique:true,

    },
    Adults:{
         type: Number,
        required:false

    },
    Children:{
         type: Number,
        required:false

    },
    planType:{
        type: String,
        required:false
    },
    
    stayingDays:{
        type: Number,
        required:false
    },
   
    totalRate:{
        type: Number,
        required:false

    },
    gender:{
        type: String,
        required:false
    },
    address:{
        type: String,
        required:false
    }

})

module.exports=bookForm=mongoose.model('bookForm',bookFormSchema);
const mongoose=require ("mongoose");
const validator=require("validator");

const bookingSchema= new mongoose.Schema({

    propertyId:{
         type: Number,
        required:true

    },

    roomType:{
         type: String,
        required:true

    },

    guestName:{
         type: String,
        required:true

    },
    mobile:{ 
        type: Number,
        required:true,
        unique:true,
        min: 10
    },
    email:{
        type: String,
        required:true,
        unique:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email")
            }
        }
    },
    Adults:{
         type: Number,
        required:true

    },
    Children:{
         type: Number,
        required:true

    },
    planType:{
        type: String,
        required:true
    },
    
    stayingDays:{
        type: Number,
        required:true
    },
   
    totalRate:{
        type: Number,
        required:true

    }

})

module.exports=Booking=mongoose.model('Booking',bookingSchema);
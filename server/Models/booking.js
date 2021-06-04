const mongoose=require ("mongoose");

const bookingSchema= new mongoose.Schema({

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
        unique:false,
        min: 10
    },
    email:{
        type: String,
        required:false,
        unique:false,

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
    address:{
        type: String,
        required: false
    },
    hotelNow:{
        type: String,
        required: false
    }

})

module.exports=booking=mongoose.model('booking', bookingSchema);
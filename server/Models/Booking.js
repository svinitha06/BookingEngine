const mongoose=require ("mongoose");
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
        required:true

    },
    email:{
         type: String,
        required:true

    },
    Adults:{
         type: Number,
        required:true

    },
    Children:{
         type: Number,
        required:true

    },
    mealType:{
        type: Number,
        required:true
    },
    noOfNights:{
        type: Number,
        required:true
    },
   
    totalRate:{
        type: Number,
        required:true

    }

})

module.exports=booking=mongoose.Model('booking',bookingSchema);
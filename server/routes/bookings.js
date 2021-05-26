const express = require('express');
const mongoose = require('mongoose');
const RateMaster = require('../Models/Booking');

mongoose.connect(`mongodb+srv://sathishm2408:${encodeURIComponent('S@chu2408')}@cluster0.ifzlg.mongodb.net/BookingEngine?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})

const router = express.Router()
router.use(express.json());

//GET API

router.get('/booking',function(req,res)
{
    try{
        Booking.find(function(err,response){
            if(err)
            res.status(400).send(err)
            else
            res.send(response)
        })
    }
    catch(error){
        res.send(error)
    }
})

//POST API
router.post("/Book",(req,res) => {
    console.log(req.body);
    const rate = new Booking(req.body)
    rate.save().then(() => {
        res.status(201).send(rate);
    }).catch((err) => {
        res.status(400).send(err);
    })
})

module.exports = router;
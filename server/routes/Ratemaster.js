const  RateMaster = require('../Models/RateMaster');
const counters = require('../Models/counters');
const mongoose = require('mongoose');
const express = require('express');
// const RateMaster = require('../Models/RateMaster');
 
mongoose.connect(`mongodb+srv://sathishm2408:${encodeURIComponent('S@chu2408')}@cluster0.ifzlg.mongodb.net/BookingEngine?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})

const router = express.Router()

router.get('/getRoomType/:PropertyId', async (req, res) => {
    try{
        const post = await RateMaster.find({PropertyId:(req.params.PropertyId)});
        res.json(post);
    } catch(err){
        res.status(400).send(err)
        
    }
});


module.exports = router;
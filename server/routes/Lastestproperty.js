const counters = require('../Models/counters');
const mongoose = require('mongoose');
const express = require('express');
var User = await User.find().countDocuments()
 
mongoose.connect(`mongodb+srv://sathishm2408:${encodeURIComponent('S@chu2408')}@cluster0.ifzlg.mongodb.net/BookingEngine?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})

const router = express.Router()

router.post('/Latest', async (req, res) => {
    const post = new counters({
        count: req.body.count,
        model: req.body.model,
        field: req.body.field
    })
    try {
        const savedPost = await post.save();
        res.json(savedPost);
    } catch (err){
        res.status(400).send({message:err});
    }
});
counters.countDocuments({}, function(err, count) {
    if (err) { return handleError(err) } //handle possible errors
    res.send(count)
});


module.exports = router;
    

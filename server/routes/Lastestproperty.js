const propertyMaster = require('../Models/counters');
const mongoose = require('mongoose');
const express = require('express');
const { get } = require('./property');
 
mongoose.connect(`mongodb+srv://sathishm2408:${encodeURIComponent('S@chu2408')}@cluster0.ifzlg.mongodb.net/BookingEngine?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})

const router = express.Router()

router.post('/Latest', (req, res) => {
    console.log("get req", req.body)
    var newProperty = new IdentityCounters({
        count: req.body.count,
        model: req.body.model,
        field: req.body.field
    })
});
function getNextSequence(name) {
    var ret = db.counters.findAndModify(
           {
             query: { _id: Count },
             update: { $inc: { seq: 1 } },
             new: true,
             upsert: true
           }
    );
    return ret.seq;
 }


module.exports = router;
    

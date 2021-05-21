const express = require('express');
const mongoose = require('mongoose');
const RateMaster = require('../Models/RateMaster');
const ratemasters = require('../Models/RateMaster');
 
mongoose.connect(`mongodb+srv://sathishm2408:${encodeURIComponent('S@chu2408')}@cluster0.ifzlg.mongodb.net/BookingEngine?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})

const router = express.Router()
router.use(express.json());

// POST API
router.post("/rate",(req,res) => {
    console.log(req.body);
    const rate = new RateMaster(req.body)
    rate.save().then(() => {
        res.status(201).send(rate);
    }).catch((err) => {
        res.status(400).send(err);
    })
})

router.post("/rate",(req,res) => {
    console.log(req.body);
    const rate = new RateMaster(req.body)
    rate.save().then(() => {
        res.status(201).send(rate);
    }).catch((err) => {
        res.status(400).send(err);
    })
})

module.exports = router;

// data given through POSTMAN using POST API
//{ roomTypeId: 1,
// roomType: 'AC',
// fromDate: '2021-04-20T14:28:51.321Z',
// toDate: '2021-05-20T14:28:51.322Z',  
// perDayRate: 650,
// plan: '---' }


// creating doc manually

// const createDocument = async () => {
//     try{
//     const rate = new RateMaster({
//         roomTypeId: 1,
//         roomType: "AC",
//         fromDate: "2021-06-20T14:28:51.321Z",
//         toDate: "2021-06-20T14:28:51.322Z",
//         perDayRate: 650,
//         plan:"xxx"
//     })
    
//     const result = await rate.save();
//     console.log(result);
//     }catch(err){
//         console.log(err);
//     }
//     }
    
//     createDocument();

//GET API
// router.get('/rate',function(req,res)
// {
//     try{
//         RateMaster.find(function(err,response){
//             if(err)
//             res.status(400).send(err)
//             else
//             res.send(response)
//         })
//     }
//     catch(error){
//         res.send(error)
//     }
// })
       
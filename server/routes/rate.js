const express = require('express');
const mongoose = require('mongoose');
const RateMaster = require('../Models/RateMaster');
const RoomTypeMaster = require('../Models/RoomTypeMaster');
const { get } = require('./property');
// const ratemasters = require('../Models/RateMaster');


mongoose.connect(`mongodb+srv://sathishm2408:${encodeURIComponent('S@chu2408')}@cluster0.ifzlg.mongodb.net/BookingEngine?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})

const router = express.Router()
router.use(express.json());

// POST API
router.post("/rate", async (req, res) => {
    console.log(req.body);
    const rate = new RateMaster(req.body)
    rate.save().then(() => {
        res.status(201).send(rate);
    }).catch((err) => {
        res.status(400).send(err);
    })
})

// router.get('/getroomType/:PropertyId', async (req, res) => {
//     try{

//         res.json(post);
//     } catch(err){
//         res.status(400).send(err)

//     }
// });
router.get('/getplan', async (req, res) => {

    //console.log(req.headers)

    try {
        let checkInMonth = new Date(req.headers.checkindate).getMonth()
        let rates = []
        const rooms = await RoomTypeMaster.find({ PropertyId: Number(req.headers.propertyid) });

        rooms.forEach(async function (room) {
            //console.log("5")
            let post = await RateMaster.find({ roomTypeId: (room._id) });
            //console.log("3")
            post.forEach((rate) => {
                let checkInfromDate = new Date(rate.fromDate).getMonth()
                let checkIntoDate = new Date(rate.toDate).getMonth()
                //console.log(checkInMonth, checkInfromDate, checkIntoDate)
                if (checkInMonth >= checkInfromDate && checkInMonth <= checkIntoDate) {
                    rates.push({roomTypeId:room._id,plan:{AP:rate.perDayRate[0],EP:rate.perDayRate[1]}})
                    //console.log("4")
                }
                //check month and date

            })
            // console.log("2", rates)
        })
        mycallback = () => {
            //console.log("1", rates)
            res.send(rates)
        }
        setTimeout(mycallback,300)
        
        // res.send(rates)
        

    } catch (err) {
        console.log("error", err)
        res.status(400).send(err)
    }
});


module.exports = router;


       
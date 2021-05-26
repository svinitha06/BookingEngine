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

    console.log(req.headers)

    try {
        let checkInMonth = new Date(req.headers.checkindate).getMonth()
        let rates = []
        const rooms = await RoomTypeMaster.find({ PropertyId: Number(req.headers.propertyid) });

        rooms.forEach(async function (room) {
            console.log("5")
            let post = await RateMaster.find({ roomTypeId: (room._id) });
            console.log("3")
            post.forEach((rate) => {
                let checkInfromDate = new Date(rate.fromDate).getMonth()
                let checkIntoDate = new Date(rate.toDate).getMonth()
                console.log(checkInMonth, checkInfromDate, checkIntoDate)
                if (checkInMonth >= checkInfromDate && checkInMonth <= checkIntoDate) {
                    rates.push({roomTypeId:room._id,plan:{AP:rate.perDayRate[0],EP:rate.perDayRate[1]}})
                    console.log("4")
                }
                //check month and date

            })
            // console.log("2", rates)
        })
        mycallback = () => {
            console.log("1", rates)
            res.send(rates)
        }
        setTimeout(mycallback,5000)
        
        // res.send(rates)
        

    } catch (err) {
        console.log("error", err)
        res.status(400).send(err)
    }
});
// router.get('/getplan/:PropertyId', async (req, res) => {
//     try {
//         const rooms = await RoomTypeMaster.find({ PropertyId: (req.params.PropertyId) });
//         res.json(rooms);
//         let rooms = [{}] //the rooms you found using property id
//         rooms.forEach((room) => {
//             const post = await RateMaster.find({ roomTypeId: (room.roomTypeId) });
//             rates.push(post)
//         });
//         let rates = []
//         let filteredRate = rates.forEach((rate) => {
//             const post = await RateMaster.find({ fromDate: (rate.fromDate),toDate: (rate.toDate) })
//             res.json(post)
//         });

//     } catch (err) {
//                 res.status(400).send(err)
//     }
// });


//Now you will have all roomTypes associated with the property                      //Check for month and date in condition, if it matches then return
// router.post("/rate",(req,res) => {
//     console.log(req.body);
//     const rate = new RateMaster(req.body)
//     rate.save().then(() => {
//         res.status(201).send(rate);
//     }).catch((err) => {
//         res.status(400).send(err);
//     })



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
// router.get('/rate', function (req, res) {
//     try {
//         RateMaster.find(function (err, response) {
//             if (err)
//                 res.status(400).send(err)
//             else
//                 res.send(response)
//         })
//     }
//     catch (error) {
//         res.send(error)
//     }
// });
module.exports = router;


        // let rooms = [{},{}]//the rooms you found using property id

        // let rates= [];

        // rooms.forEach((room)=> {
        //     const post = await RateMaster.find({roomTypeId:(room.roomTypeIdId)
        // }
        // rates.push(post)
        //     )
        // );

        // //Now you will have all roomTypes associated with the property

        // let filteredRate = rates.forEach((rate)=> {
        //     const post = await RateMaster.find({roomTypeId:(room.roomTypeIdId)
        // //Check for month and date in condition, if it matches then return
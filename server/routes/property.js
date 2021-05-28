const propertyMaster = require("../Models/propertyMaster");
const counters = require("../Models/counters");

const RoomTypeMaster = require('../Models/RoomTypeMaster');
const mongoose = require("mongoose");
const express = require("express");



//const { response} = require ('express');

mongoose.connect(
    `mongodb+srv://sathishm2408:${encodeURIComponent(
        "S@chu2408"
    )}@cluster0.ifzlg.mongodb.net/BookingEngine?retryWrites=true&w=majority`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    }
);

const router = express.Router();
// router.get('/', isAuth, cartController.getCart);
// router.post('/add', isAuth, cartController.addToCart);
// router.post('/delete', isAuth, cartController.removeFromCart);
// router.post('/update', isAuth, cartController.updateCart);
// router.post('/sync', isAuth, cartController.syncCart);

// GET API

router.get("/Property", function (req, res) {
    try {
        propertyMaster.find(function (err, response) {
            if (err) res.status(400).send(err);
            else res.send(response);
        });
    } catch (error) {
        res.send(error);
    }
});

router.post("/addProperty", async (req, res) => {
    console.log("get req", req.body);
    try {
        let oldCount = await counters.findOne({
            field: "PropertyId",
        });
        console.log("oldCount", oldCount);
        let newCount = await counters.findOneAndUpdate(
            {
                field: "PropertyId",
            },
            {
                count: oldCount.count + 1,
            },
            {
                new: true,
            }
        );
        console.log("newCount", newCount);

        var newProperty = new propertyMaster({
            PropertyId: newCount.count,
            name: req.body.name,
            Image: req.body.Image,
            location: req.body.location,
            description: req.body.description,
            ratings: req.body.ratings,
            website: req.body.website,
            contact: req.body.contact,
            Address: req.body.Address,
        });
        newProperty.save(function (err, Person) {
            if (err) res.status("400").send(err);
            else res.send(Person);
        });
    } catch (error) {
        console.log("catch", error);
    }
});

//Getting property based on locations and availability
router.get('/Property/search', async (req, res) => {
    try {
        let props = await propertyMaster.find({ location: (req.headers.location) });
        let newProps = []
        await props.forEach(async (prop) => {
            console.log("3")
            let totalAvailability = 0;

            post = await RoomTypeMaster.find({ PropertyId: (prop.PropertyId) })
            post.forEach(room => {
                console.log("4")
                totalAvailability += (room.availability)

            })

            if (Number(totalAvailability) >= Number(req.headers.roomsrequired))
                newProps.push(prop)
        })
        mycallback = () => {
            console.log("2", newProps)
            res.send(newProps)
        }
        setTimeout(mycallback, 4000)

    } catch (err) {
        res.status(400).send(err)

    }
});

//Getting property by location


router.get('/Property/:location', async (req, res) => {
    try{
        const post = await propertyMaster.find({location:(req.params.location)});
        res.json(post);
    } catch(err){
        res.status(400).send(err)
        
    }
});
   
 
module.exports = router;



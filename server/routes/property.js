<<<<<<< HEAD
const propertyMaster = require("../Models/propertyMaster");
const counters = require("../Models/counters");
const mongoose = require("mongoose");
const express = require("express");

//const { response} = require ('express');

mongoose.connect(
  `mongodb+srv://sathishm2408:${encodeURIComponent(
    "S@chu2408"
  )}@cluster0.ifzlg.mongodb.net/BookingEngine?retryWrites=true&w=majority`,
  {
=======
const propertyMaster = require('../Models/propertyMaster');
const counters = require('../Models/counters');
const mongoose = require('mongoose');
const express = require('express');
<<<<<<< Updated upstream
 
//const { response} = require ('express');
 
=======
>>>>>>> Stashed changes
mongoose.connect(`mongodb+srv://sathishm2408:${encodeURIComponent('S@chu2408')}@cluster0.ifzlg.mongodb.net/BookingEngine?retryWrites=true&w=majority`, {
>>>>>>> 658cff62b2d6750ccfbd1dc494abfaacd63792ed
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
<<<<<<< HEAD

// GET API
=======
 
// GET API  
 
router.get('/Property',function(req,res)
{
    try{
        propertyMaster.find(function(err,response){
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
 
router.post('/addProperty', async(req, res) => {
    console.log("get req", req.body)
    try{
        let oldCount =  await counters.findOne({
            field: "PropertyId"
        });
        console.log("oldCount",oldCount);
        let newCount = await counters.findOneAndUpdate({
            field: "PropertyId"
        },
        {
            count: oldCount.count + 1
        },{
            new: true
        })
        console.log("newCount",newCount);
 
    var newProperty = new propertyMaster({
        PropertyId: newCount.count,
        name: req.body.name,
        Image: req.body.Image,
        location: req.body.location,
        description: req.body.description,
        ratings: req.body.ratings,
        website: req.body.website,
        contact: req.body.contact,
        Address: req.body.Address
    })
    newProperty.save(function (err, Person) {
        if (err)
            res.status('400').send(err)
        else
            res.send(Person)
    })
}
catch(error){
    console.log("catch",error)
}
});
<<<<<<< Updated upstream
>>>>>>> 658cff62b2d6750ccfbd1dc494abfaacd63792ed
=======
 
>>>>>>> Stashed changes

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

<<<<<<< Updated upstream
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

<<<<<<< HEAD
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

=======
 
>>>>>>> 658cff62b2d6750ccfbd1dc494abfaacd63792ed
//Getting property based on locations
router.get("/Property/:location", async (req, res) => {
  try {
    const post = await propertyMaster.find({ location: req.params.location });
    res.json(post);
  } catch (err) {
    res.status(400).send(err);
  }
});
<<<<<<< HEAD
=======
//Getting property based on locations & availability
router.get('/Property/search', async (req, res) => {
    console.log(req.headers)
    try{
        let props = propertyMaster.find({location:(req.headers.location)});
        let newProps =props.filter( (prop) =>{

            let totalAvailability = 0;
            
            let post =  RoomTypeMaster.find({PropertyId:(prop.PropertyId)})
            
            post.forEach( room => {
                totalAvailability +=(room.availability)
            })
            
            if(totalAvailability >= (req.headers.roomsRequired) )
            
            return true
            
            });
            res.send(newProps)
        
    } catch(err){
        res.status(400).send(err)
        
    }
});

>>>>>>> Stashed changes

module.exports = router;
=======
module.exports = router;
>>>>>>> 658cff62b2d6750ccfbd1dc494abfaacd63792ed

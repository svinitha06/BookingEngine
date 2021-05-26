const express = require("express");

const RoomTypeMaster = require("../Models/RoomTypeMaster");
const mongoose = require("mongoose");

mongoose.connect(
  `mongodb+srv://sathishm2408:${encodeURIComponent(
    "S@chu2408"
  )}@cluster0.ifzlg.mongodb.net/BookingEngine?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const router = express.Router();

//get back all the rooms
router.get("/getRoomType", async (req, res) => {
  try {
    const posts = await RoomTypeMaster.find();
    res.json(posts);
  } catch (err) {
    res.json({ message: err });
  }
});

//Submit a post for rooms
router.post("/addRoomType", async (req, res) => {
  const post = new RoomTypeMaster({
    PropertyId: req.body.PropertyId,
    roomType: req.body.roomType,
    roomImage: req.body.roomImage,
    description: req.body.description,
    numberofRooms: req.body.numberofRooms,
    availability: req.body.availability,
  });
  try {
    const savedPost = await post.save();
    res.json(savedPost);
  } catch (err) {
    res.status(400).send({ message: err });
  }
});

<<<<<<< HEAD
//Getting rooms by ProprtyID
router.get("/:PropertyId", async (req, res) => {
  try {
    const post = await RoomTypeMaster.find({
      PropertyId: req.params.PropertyId,
    });
    res.json(post);
  } catch (err) {
    res.status(400).send(err);
  }
});
=======

<<<<<<< Updated upstream
//Getting rooms by Proprty ID
//  router.get('/getRoomType/:availability', async (req, res) => {
//      try{
//          const post = await RoomTypeMaster.find({availability: {$gte : 11}});
//          res.json(post);
//      } catch(err){
//          res.status(400).send(err)        
//      }
//  });

>>>>>>> 658cff62b2d6750ccfbd1dc494abfaacd63792ed

module.exports = router;
=======


//getting rooms by PropertyId
 router.get('/getRoomType/:PropertyId', async (req, res) => {
     try{
         const post = await RoomTypeMaster.find({PropertyId:(req.params.PropertyId)});
         res.json(post);
     } catch(err){
         res.status(400).send(err)
         
     }
 });


 //import React, { Component } from 'react';
//  class Availablility extends Component {
//     constructor() {
//       super();
//       this.state = {
//         availablility: '',
//         isLoading: true,
//       };
//     }
  
    // componentDidMount() {
    //   axios
    //     .get('http://localhost:5000/rooms/getRoomType/1')
    //     .then(({ data }) => {
    //       console.log(data);
    //       this.setState({
    //         availablility: data.availablility,
    //         isLoading: false
    //       });
    //     })
    //     .catch(err => {});
    // };
//      componentDidMount() {
//          axios
//              .get('http://localhost:5000/rooms/getRoomType/1')
//              .then(({ data }) => {
//              var sum = 0;
//              if(typeof data == 'object'){
//                  data.forEach(rooms => {
//                      sum += parseFloat(rooms.availability);
//                 });
//             }
//             this.setState({
//                 availability: sum,
//                 isLoading: false
//             });
//         })
//         .catch(err => {});
//     }
//  }
//exports default RoomTypeMaster;


// const totalz2 = () => {
//     let total2 = 0;
//     for (let i = 0; i < props.availablility.length; i++) {
//       total2 += props.availablility[i].RoomTypeMaster;
//     }
//     //return total2;
//     console.log(total2);
//   };


// router.get('/roomsavailability/:PropertyId', async (req, res) => {
//     try{
//         const post = await RoomTypeMaster.find({PropertyId:(req.params.PropertyId)});
//         post.forEach(({ availability }) => {
//             var sum = 0;
            
//                 post.forEach(post => {
//                     sum += parseFloat(post.availability);
//                });
//             })
            
//         res.json(sum);
//         } catch(err){
//         res.status(400).send(err)
        
//     }
// });

// router.get('/roomsavailability/:PropertyId', async (req, res) => {
//     try{
//         const post = await RoomTypeMaster.find({PropertyId:(req.params.PropertyId)});
        
//         var sum = 0;
            
//         post.forEach(rooms => {
//                     sum += parseFloat(rooms.availability);
//                });
            
            
//         res.json(sum);
//     } catch(err){
//         res.status(400).send(err)
        
//     }
// });

//   /api/v1/products?price=gte:5.00


// router.get('/getRoomType/:PropertyId', async (req, res) => {
//      try{
//          const post = await RoomTypeMaster.find({PropertyId:(req.params.PropertyId)});
//          res.json(post);
//      } catch(err){
//          res.status(400).send(err)
         
//      }
//  });

// router.get('/getRoomType/:requiredRooms', async (req, res) => {
//     try{
//         const post = await RoomTypeMaster.find({availability:(req.params.availability)});
        
        //var sum = 0;
            
       // post.forEach(rooms => {
        //            sum += parseFloat(rooms.availability);
        //       });
            
            
//         res.json(post);
//     } catch(err){
//         res.status(400).send(err)
        
//     }
// });

// router.get('/getRoomType/:availability', async (req, res) => {
//     try{
//         const post = await RoomTypeMaster.find({availability:(req.params.availability)});
//         res.json(post);
//     } catch(err){
//         res.status(400).send(err)
        
//     }
// });

module.exports = router;
>>>>>>> Stashed changes

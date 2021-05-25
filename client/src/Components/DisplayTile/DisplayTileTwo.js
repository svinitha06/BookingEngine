// import React, { Component } from "react";
// import ImageTile from "../DisplayTile/Image.jpeg";
// import Details from "./roomTypeDetail.json";
// import "./DisplayTile.css";

// import WifiRoundedIcon from "@material-ui/icons/WifiRounded";
// import FreeBreakfastRoundedIcon from "@material-ui/icons/FreeBreakfastRounded";
// import CheckCircleSharpIcon from "@material-ui/icons/CheckCircleSharp";
// // import { Db } from "mongodb";

// import { getRooomTypes } from "../../api/index.js";
// import { roomDetails } from "../../actions/index";

// import { get } from "lodash";
// import { bindActionCreators } from "redux";
// import { connect } from "react-redux";
// import { withRouter } from "react-router-dom";
// // import getRoomTypes from "././../api/index";
// class DisplayTileTwo extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       // isChange: true,
//       // price1: 0,
//       countObj: [],
//       AllTotal: 0,
//       roomDetailsTypeList: [],
//     };
//   }

//   componentDidMount() {
//     this.getRooomCall();

//     var countObj = this.state.roomDetailsTypeList.map((data) => {
//       return {
//         id: data.id,
//         count: 0,
//         price: data.price,
//         // AllTotal: 0,
//       };
//     });
//     this.setState({
//       countObj: countObj,
//     });
//   }
//   getRooomCall = async () => {
//     let resp = await getRoomTypes();
//     this.props.roomDetails(resp);
//     console.log("From the GETROOMCALLL OF COMPONENT DID MOUNT");
//   };

//   // componentWillUnmount() {
//   //   if (!this.state.roomDetailsTypeList.length) {
//   //     this.setState({
//   //       roomDetailsTypeList: this.props.roomDetails,
//   //     });
//   //   }
//   // }
//   // componentDidUpdate() {
//   //   if (!this.state.roomDetailsTypeList.length) {
//   //     this.setState({
//   //       roomDetailsTypeList: this.props.roomDetails,
//   //     });
//   //   }
//   // }
//   handleMinus = (id) => {
//     var count = this.state.countObj;
//     // var price = this.state.countObj;
//     count.forEach((data) => {
//       if (data.id === id) {
//         data.count -= 1;
//         // data.price -= price;
//       }
//       //
//     });
//     this.setState({
//       countObj: count,
//       // countObj: price,
//     });
//   };

//   handlePlus = (id) => {
//     var count = this.state.countObj;
//     var total = 0,
//       temp = 0;

//     // var price = this.state.countObj;
//     count.forEach((data) => {
//       if (data.id === id) {
//         data.count += 1;
//         // data.price += price;
//         total = data.price * data.count;
//         temp += total;
//         this.setState({
//           AllTotal: temp,
//         });
//       }
//       // console.log("alltotal plus", this.state.AllTotal);
//     });
//     this.setState({
//       countObj: count,
//       // AllTotal: data.price * data.count
//       // countObj: price,
//     });
//   };

//   render() {
//     console.log("state  ", this.state);
//     if (!this.state.roomDetailsTypeList.length) {
//       this.setState({
//         roomDetailsTypeList: this.props.roomDetails,
//       });
//     }
//     return (
//       <div className="display">
//         <div>
//           {this.state.roomDetailsTypeList.map((data) => {
//             let room = 0;
//             let total = 0;
//             // var price = this.state.countObj;
//             var temp = this.state.AllTotal;
//             var count = this.state.countObj;
//             count.forEach((data) => {
//               if (data.id === id) {
//                 room = data.count;
//                 console.log(" before Total price = ", total);
//                 total = data.price * data.count;
//                 temp += total;

//                 // this.setState({
//                 //   count: 0,
//                 // });
//                 console.log(" before temp price = ", temp);

//                 console.log(" AllTotal state price = ", this.state.AllTotal);
//               }
//               // total = data.price;
//             });
//             // count.forEach((data)=>{

//             // })
//             console.log("Total price = ", total);
//             // price.forEach((data) => {
//             //   if (data.id === post.id) {
//             //     total = data.price;
//             //   }
//             // });
//             return (
//               <div className="wrapperOne">
//                 <div className="ImageTileOne">
//                   <img src={ImageTile}></img>
//                 </div>
//                 <div className="childWrapperOne" key={data.id}>
//                   <div>
//                     <h2>{data.roomType}</h2>
//                     <p>{data.description}</p>
//                   </div>
//                   <div className="price">
//                     <div className="block1">
//                       <p>Starting from</p>
//                       <h2>
//                         {/* {post.price} */}
//                         Some Price
//                       </h2>
//                     </div>
//                     <div className="button-price">
//                       <button
//                         className="thebutton"
//                         onClick={() => this.handleMinus(data.id)}
//                       >
//                         -
//                       </button>
//                       <button className="thebutton">{room}</button>
//                       <button
//                         className="thebutton"
//                         onClick={() => this.handlePlus(data.id)}
//                       >
//                         +
//                       </button>
//                     </div>
//                   </div>
//                   <div>
//                     <div className="facilities">
//                       <WifiRoundedIcon
//                         className="icon"
//                         style={{ color: "#6D6B68" }}
//                       ></WifiRoundedIcon>
//                       <p className="icon">
//                         {/* {post.three} */}
//                         Free Wifi
//                       </p>
//                       <FreeBreakfastRoundedIcon
//                         className="icon"
//                         style={{ color: "#DE7A34" }}
//                       ></FreeBreakfastRoundedIcon>
//                       <p className="icon">
//                         {/* {post.four} */}
//                         Free Breakfast
//                       </p>
//                       <CheckCircleSharpIcon
//                         className="icon"
//                         style={{ color: "#0E8C11" }}
//                       ></CheckCircleSharpIcon>
//                       <p className="icon">
//                         {/* {post.five} */}
//                         sanitized
//                       </p>
//                     </div>
//                   </div>
//                   <div>
//                     <div className="reserve-content">
//                       <div className="roomdiv">
//                         <h3>Total Rooms :</h3>
//                         <h3>{room}</h3>
//                       </div>
//                       <div className="roomdiv">
//                         <h3>Total Price :</h3>
//                         <h3 className="priceh2">{room}</h3>
//                       </div>

//                       {/* <button className="reserve">Reserve</button> */}
//                     </div>
//                   </div>
//                 </div>
//                 <div></div>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     );
//   }
// }
// const mapDispatchToProps = (dispatch) => {
//   return {
//     roomDetails: bindActionCreators(roomDetails, dispatch),
//   };
// };
// const mapStateToProps = (state) => {
//   return {
//     roomTypeList: get(state, "roomTypeList", []),
//   };
// };

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(withRouter(DisplayTileTwo));

import React from 'react';
import './Home.css'
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';
import hotel1 from "../Home/home1.jpg"
import hotel2 from "../Home/home2.jpg"
import hotel3 from "../Home/home3.jpg"

class Home extends React.Component{
    
    render(){
        return(
            <div className="homeDiv">
                <Carousel style={{"width":"600px"}}  autoPlay={true} infiniteLoop={true} showThumbs={false} showStatus={false} showIndicators={false} showArrows={false}>
                <div>
                    <img src={hotel1} height="400px" />
                    
                </div>
                <div>
                    <img src={hotel2}  height="400px"  />
                    
                </div>
                <div>
                    <img src={hotel3}  height="400px" />
                    
                </div>
            </Carousel>
                </div>
                
            

        )
    }

}
 

export default connect(null, null)(withRouter(Home));
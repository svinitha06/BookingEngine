import {React,Component} from 'react'
import "./Footer.css"

 class Footer extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        
      };
    }
  
    
    render() {
      return (
        <div className="main-footer">
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h4>Booking Engine</h4>
                        <ul className="list-unstyled">
                            <li>(+91)7836528737</li>
                            <li>Delhi,India</li>
                            <li>45A,South Nagapan St.</li>
                        </ul>
                    </div>
                    <div className="col">
                        <h4>Services</h4>
                        <ul className="list-unstyled">
                            <li>(+91)783</li>
                            <li>Delhi,India</li>
                            <li>45A,South Nagapan St.</li>
                        </ul>
                    </div>
                    <div className="col">
                        <h4>About Us</h4>
                        <ul className="list-unstyled">
                            <li>(+91)7836528737</li>
                            <li>Delhi,India</li>
                            <li>45A,South Nagapan St.</li>
                        </ul>
                    </div>

                </div>
               

            </div>
            <hr style={{backgroundColor:"black"}}/>
                <div className="row">
                    <p className="col-sm" style={{color:"black",paddingLeft:"24em"}}>
                        &copy;{new Date().getFullYear()} Booling Engine | All rights reserved | Terms of Service | Privacy
                    </p>
                </div>

        </div>
      
      )
  }
  
} 
export default Footer
import React from 'react';
import './Home.css'
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';

class Home extends React.Component{
    
    render(){
        return(
            <div className="homeDiv">
               
                <div className="homeContainer">
                    HomePage
                </div>
            </div>
            

        )
    }

}
 

export default connect(null, null)(withRouter(Home));
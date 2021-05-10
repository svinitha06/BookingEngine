import React from 'react';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { Card } from 'semantic-ui-react';
import './BookNow.css'

class BookNow extends React.Component {

    render() {
        return (
            <div className="bookNowDiv">
                <div className="cardDiv">
                    <Card className="bookCard">
                        <Card.Content>
                            <div className="row">
                                <div className="col">
                                    <div className="row">
                                        <div className="col">Arrival</div>
                                        <div className="col">Departure</div>
                                    </div>
                                </div>
                                <div className="col">Rooms</div>
                            </div>
                        </Card.Content>
                    </Card>
                </div>
            </div>

        )
    }

}


export default connect(null, null)(withRouter(BookNow));
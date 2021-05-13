import React, { Component } from 'react'
import './BasicLayout.css'
import ImageTile from '../BookNow/Image.jpeg' 
import ImageOne from '../BookNow/Cover.jpeg'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-dates/initialize'
import 'react-dates/lib/css/_datepicker.css'
import {DateRangePicker} from 'react-dates'

export class BasicLayout extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             startDate: null,
             endDate: null
        }
    }
    

    render() {
        return (
            <div>
                <div className='wrapImage'>
                    <img src={ImageOne}></img>
                </div>
                {/* DatePicker */}
                <div>  
                    <DateRangePicker
                        startDate={this.state.startDate} 
                        startDateId="your_unique_start_date_id" 
                        endDate={this.state.endDate} 
                        endDateId="your_unique_end_date_id" 
                        onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })} 
                        focusedInput={this.state.focusedInput} 
                        onFocusChange={focusedInput => this.setState({ focusedInput })} 
                        />
                </div>
                <div className='wrapper'>
                    <div >
                        <img className='ImageTile'src={ImageTile}></img>
                    </div>
                    <div>
                        jsncjkdnkjdscnjksndjcnsjkdjksnd
                    </div>

                    <div>
                        <img className='ImageTile'src={ImageTile}></img>
                    </div>
                    <div>
                    And that’s the basics of CSS Grid! Using the properties we’ve gone over, you now have the availability to create multi-dimensional layouts that will best suit your website. Let's look at another example with the same number of elements as the previous example, but with different CSS styling
                    And that’s the basics of CSS Grid! Using the properties we’ve gone over, you now have the availability to create multi-dimensional layouts that will best suit your website. Let's look at another example with the same number of elements as the previous example, but with different CSS styling
                    And that’s the basics of CSS Grid! Using the properties we’ve gone over, you now have the availability to create multi-dimensional layouts that will best suit your website. Let's look at another example with the same number of elements as the previous example, but with different CSS styling
                    
                    </div>
                    <div>
                        <img className='ImageTile'src={ImageTile}></img>
                    </div>
                    <div>
                    And that’s the basics of CSS Grid! Using the properties we’ve gone over, you now have the availability to create multi-dimensional layouts that will best suit your website. Let's look at another example with the same number of elements as the previous example, but with different CSS styling
                    And that’s the basics of CSS Grid! Using the properties we’ve gone over, you now have the availability to create multi-dimensional layouts that will best suit your website. Let's look at another example with the same number of elements as the previous example, but with different CSS styling
                    And that’s the basics of CSS Grid! Using the properties we’ve gone over, you now have the availability to create multi-dimensional layouts that will best suit your website. Let's look at another example with the same number of elements as the previous example, but with different CSS styling
                    
                    </div>
                </div>
            </div>
            
        )
    }
}

export default BasicLayout

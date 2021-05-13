import React, { Component } from 'react'
import './BasicLayout.css'
import ImageTile from '../BookNow/Image.jpeg' 
import ImageOne from '../BookNow/Cover.jpeg'
import { DateRangePickerComponent } from "@syncfusion/ej2-react-calendars";
import 'bootstrap/dist/css/bootstrap.min.css'


export class BasicLayout extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }
    

    render() {
        const startValue = null;
    const endValue = null;
    const minValue = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate()
    );
        return (
            <div>
                <div className='wrapImage'>
                    <img src={ImageOne}></img>
                </div>
                {/* DatePicker */}
                <div>  
                <DateRangePickerComponent
                      placeholder="Check-in/Check-out"
                      startDate={startValue}
                      endDate={endValue}
                      min={minValue}
                      format={"dd-MMM-yy"}
                      color={"white"}
                    ></DateRangePickerComponent>
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

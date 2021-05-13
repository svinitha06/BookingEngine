import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom'
import {Button, Menu, MenuItem, Segment} from 'semantic-ui-react'
import './Header.css'
export class Header extends Component {
    render() {
        return (
            <div className='my-div'>
                <Segment className='my-seg'>
                    <Menu secondary className='my-menu'>
                        <div className='logo'>
                            <MenuItem><h1>Booking Engine</h1></MenuItem>
                        </div>
                        <Menu.Item position='right' as={NavLink} to='/' exact>Home</Menu.Item>
                        <Menu.Item position='right' as={NavLink} to='/aboutUs'>About Us</Menu.Item>
                        <Menu.Item position='right' as={NavLink} to='/accommodation'>Accomodation</Menu.Item>
                        <Menu.Item position="right">
                            <Button
                                as={NavLink} to='/booknow'
                            >Book Now</Button>
                        </Menu.Item>
                    </Menu>
                </Segment>
            </div>
        )
    }
}

export default Header

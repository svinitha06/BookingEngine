import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom'
import {Button, Menu, Segment} from 'semantic-ui-react'
import './Header.css'
export class Header extends Component {
    render() {
        return (
            <div className='my_div'>
                <Segment inverted className='my_seg'>
                    <Menu secondary inverted className='my_menu'>
                        <Menu.Item as={NavLink} to='/' exact>Home</Menu.Item>
                        <Menu.Item as={NavLink} to='/aboutUs'>About Us</Menu.Item>
                        <Menu.Item as={NavLink} to='/accommodation'>Accomodation</Menu.Item>
                        <Menu.Item as={NavLink} to='/facilities'>Facilities </Menu.Item>
                        <Menu.Item as={NavLink} to='/gallery'>Gallery</Menu.Item>
                        <Menu.Item as={NavLink} to='/reviews'>Reviews</Menu.Item>
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

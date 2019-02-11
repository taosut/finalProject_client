import React, {Component} from 'react';
import {FaSearch} from 'react-icons/fa';
import {FaRegUser} from 'react-icons/fa';
import {FiShoppingCart} from 'react-icons/fi';
import {NavLink} from 'react-router-dom';
import './NavbarIcons.scss';

class NavbarIcons extends Component {
    render() {
        return (
            <>
                <ul className='NavbarIconsMenu'>
                    <li className='NavbarIconsMenu__item'>
                        <input className='NavbarIconsMenu__search' type='search' name='search' placeholder='Search'/>
                        <NavLink to="#" className='NavbarIconsMenu__link'>
                            <FaSearch className='NavbarIconsMenu__icon'/>
                        </NavLink>
                    </li>
                    <li className='NavbarIconsMenu__item'>
                        <NavLink to="/login" className='NavbarIconsMenu__link'>
                            <FaRegUser className='NavbarIconsMenu__icon'/>
                        </NavLink>
                    </li>
                    <li className='NavbarIconsMenu__item'>
                        <NavLink to="#" className='NavbarIconsMenu__link'>
                            <FiShoppingCart className='NavbarIconsMenu__icon'/>
                        </NavLink>
                    </li>
                </ul>
            </>
        )
    }
}

export default NavbarIcons;
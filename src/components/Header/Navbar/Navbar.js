import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import NavbarIcons from './NavbarIcons/NavbarIcons'
import {NavLink} from 'react-router-dom';
import './Navbar.scss';

const leftPosHide = {left: '-3000px'};
const leftPosShow = {left: '0'};

const propTypes = {
  departments: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      name: PropTypes.string,
      slug: PropTypes.string,
      parent: PropTypes.string,
      position: PropTypes.number,
      filters: PropTypes.shape,
    }))
};


class Navbar extends Component {

  state = {
    menuOpened: false
  };

  toogleMenu() {
    this.setState({menuOpened: !this.state.menuOpened});
  }

  render() {
    const {departments, currentDepartment} = this.props;

    console.group('DEPARTMENTS IN NAV BAR');
    console.log(departments);
    console.groupEnd();

    // filter root level's departments for top menu
    const rootDepartments = departments.filter((department) => department.parent === "0");
    // collect data of root department
    const current = departments.filter((department) => department.slug === currentDepartment);
    let childrenDepartments = [];
    if (current.length) {
      // collect data for children departments
      const parentId = current[0].parent === "0" ? current[0].id : current[0].parent;
      childrenDepartments = departments.filter((department) => department.parent === parentId);
    }

    return (
      <div className="navbar">
        <div className="container">
          <div className="navbarContainer">
            <div className="navbarTop">
              <div className="navbarTopMainContent">
                <div className={this.state.menuOpened ? 'navBurger open' : 'navBurger'}
                     onClick={this.toogleMenu.bind(this)}>
                  <span className="navBurger__line"></span>
                  <span className="navBurger__line"></span>
                  <span className="navBurger__line"></span>
                  <span className="navBurger__line"></span>
                </div>

                <NavLink to="/" className='mainLogo__link'>
                  <h1 className="mainLogo">Uno</h1>
                </NavLink>

                <ul className="genderNav">
                  {
                    rootDepartments.map((department) => {
                      return (
                        <li className="genderNav__item" key={department.slug}>
                          <NavLink
                            to={`/${department.slug}`}
                            className="genderNav__link"
                            activeClassName={currentDepartment === department.slug ? 'active' : ''}
                          >{department.name}</NavLink>
                        </li>
                      );
                    })
                  }

                  {/*
                  <li className="genderNav__item">
                    <NavLink to="/women" activeClassName="active" className="genderNav__link ">Women</NavLink>
                  </li>
                  <li className="genderNav__item">
                    <NavLink to="/men" className="genderNav__link">Men</NavLink>
                  </li>*/}
                </ul>
              </div>
              <NavbarIcons/>
            </div>

            <div id='navbarMenuContent' className="navbarMenuContent"
                 style={this.state.menuOpened ? leftPosShow : leftPosHide}>

              <ul className="switchNav">
                <li className="switchNav__item">
                  {/*<a href="#" className="switchNav__link">Women</a>*/}
                </li>
                <li className="switchNav__item">
                  {/*<a href="#" className="switchNav__link">Men</a>*/}
                </li>
              </ul>

              <ul className="navbarNav">
                {
                  childrenDepartments.length > 0
                  &&
                  childrenDepartments.map((department) => {
                    return (
                      <li className="navbarNav__item" key={department.slug}>
                        <NavLink
                          to={`/${department.slug}`}
                          className="navbarNav__link"
                          activeClassName={currentDepartment === department.slug ? 'active' : ''}
                        >{department.name}</NavLink>
                      </li>
                    );
                  })
                }


                {/*                <li className="navbarNav__item">
                  <NavLink to="#" className='navbarNav__link'>Clothing</NavLink>
                </li>
                <li className="navbarNav__item">
                  <NavLink to="#" className='navbarNav__link'>Accessories</NavLink>
                </li>
                <li className="navbarNav__item">
                  <NavLink to="#" className='navbarNav__link'>Shoes</NavLink>
                </li>
                <li className="navbarNav__item">
                  <NavLink to="#" className='navbarNav__link'>Sport</NavLink>
                </li>
                <li className="navbarNav__item">
                  <NavLink to="#" className='navbarNav__link'>Beauty</NavLink>
                </li>*/}
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Navbar.propTypes = propTypes;

const mapStateToProps = state => ({
  departments: state.app.departments,
  currentDepartment: state.products.currentDepartment,
});

export default connect(mapStateToProps, null)(Navbar);

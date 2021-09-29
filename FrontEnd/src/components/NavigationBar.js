import React, {useContext, Fragment} from 'react'

import {
    Navbar,
    NavItem,
    NavLink,
    Nav,
    NavbarBrand,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap'

import {
    Link,
    withRouter
} from 'react-router-dom'

import Context from '../context/context'
import { LOGOUT } from '../context/action-type'

import 'bootstrap/dist/css/bootstrap.min.css'
import '../App.css'
import { FaSignOutAlt, FaUser, FaCog } from 'react-icons/fa'


const currentTab = (history, path) => {
    if (history.location.pathname === path) {
      return { color: "#000" };
    } else {
      return { color: "#fff" };
    }
};

const NavigationBar = ({history}) => {

    const {loggedIn, dispatch} = useContext(Context)

    const logout = () => {
        localStorage.removeItem('toys-jwt')
        dispatch({
            type: LOGOUT,
            payload: ''
        })
        history.push('/')
    }

    return(
            <Navbar className="border-bottom bg-success">
                {/* {JSON.stringify(loggedIn)} */}
                <NavbarBrand className="text-white px-3">
                    <Link to="/"  className="text-white" style={{textDecoration:'none'}}>ToysGiveAway.Com</Link>
                </NavbarBrand>
                <Nav>
                    <NavItem>
                        <NavLink>
                            <Link to="/" className="navLink" style={currentTab(history, "/")}>Home</Link>
                        </NavLink>
                    </NavItem>
                   
                    
                    {
                        loggedIn.isLoggedIn && loggedIn.loggedInUserType === 'admin' ? 
                            <NavItem>
                                <NavLink className="">
                                <Link to="/admin/dashboard" className="navLink" style={currentTab(history, "/admin/dashboard")}>
                                    Admin Dashboard
                                </Link>
                                </NavLink>
                            </NavItem>
                        : ''
                    }
                    
                    {
                        loggedIn.isLoggedIn && loggedIn.loggedInUserType === 'seller' ? 
                            <Fragment>
                                <NavItem>
                                    <NavLink>
                                        <Link to="/chat" className="navLink" style={currentTab(history, "/chat")}>Chat</Link>
                                    </NavLink>
                                </NavItem> 
                                <NavItem>
                                    <NavLink style={currentTab(history, "/seller/dashboard")} className="">
                                    <Link to="/seller/dashboard" className="navLink" style={currentTab(history, "/seller/dashboard")}>
                                        Seller Dashboard
                                    </Link>
                                    </NavLink>
                                </NavItem>
                            </Fragment>
                        : ''
                    }

                    {
                        loggedIn.isLoggedIn && loggedIn.loggedInUserType === 'buyer' ? 
                        <Fragment>
                            <NavItem>
                                <NavLink>
                                    <Link to="/chat" className="navLink" style={currentTab(history, "/chat")}>Chat</Link>
                                </NavLink>
                            </NavItem> 
                            <NavItem>
                                <NavLink style={currentTab(history, "/buyer/dashboard")} className="">
                                <Link to="/buyer/dashboard" className="navLink" style={currentTab(history, "/buyer/dashboard")}>
                                        Buyer Dashboard
                                    </Link>
                                </NavLink>
                            </NavItem>
                        </Fragment>
                        : ''
                    }
                   {
                        !loggedIn.isLoggedIn && (
                            <Fragment>
                                <NavItem>
                                    <NavLink className="">
                                        <Link to="/signup" className="navLink" style={currentTab(history, "/signup")}>Signup</Link>
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="">
                                    <Link to="/signin" className="navLink" style={currentTab(history, "/signin")}>Signin</Link>
                                    </NavLink>
                                </NavItem>
                            </Fragment>
                        )
                   }

                    {
                        loggedIn.isLoggedIn && (
                                <UncontrolledDropdown nav inNavbar>
                                    <DropdownToggle nav caret className="text-warning">
                                        {
                                            loggedIn.isLoggedIn && loggedIn.loggedInUserType === 'admin' ? 'Admin' : loggedIn.loggedInUser.firstName
                                        }
                                    </DropdownToggle>
                                    <DropdownMenu right className="my-dropdown">
                                        <DropdownItem>
                                            <span className="text-primary" style={{cursor:'pointer', textDecoration:'none', color:'#000', float:'right'}} onClick={() => history.push('/changepassword')}>
                                                Change Password <FaCog className="ms-2" />
                                            </span>
                                        </DropdownItem>
                                        <DropdownItem>
                                            <span className="text-primary" style={{cursor:'pointer', textDecoration:'none', color:'#000', float:'right'}} onClick={logout}>
                                                Logout <FaSignOutAlt className="ms-2" />
                                            </span>
                                        </DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                        )
                    }
                    
                </Nav>
            </Navbar>
    )
}


export default withRouter(NavigationBar);
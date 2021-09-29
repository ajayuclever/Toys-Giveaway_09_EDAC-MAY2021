import React, {useContext, useState, useEffect} from "react";
import { withRouter } from "react-router";

import Footer from "./Footer";
import AddToys from "./AddToys";
import ChangePassword from "./ChangePassword";
import Profile from "./Profile";
import MyToys from "./MyToys";

import {
    Container,
    ListGroup,
    ListGroupItem,
    Button,
    Form,
    Input,
} from 'reactstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

import Context from "../context/context";


const SellerDashboard = ({history}) => {

    const {loggedIn, dispatch} = useContext(Context)

    useEffect(() => {
        if(!loggedIn.isLoggedIn){
            history.push('/signin')
        }
    }, [])

    const [currentView, setCurrentView] = useState(0)

    return (
        <>
            {/* <h1 className="text-center">Seller Dashboard</h1> */}
                {/* <p className="text-center">{JSON.stringify(loggedIn.loggedInUser)}</p> */}
            <Container className="pt-3">
                <div className="row pb-2" style={{height: '80vh', width: '100%'}}>
                    <div className="col-3 p-4 border-end">
                        <ListGroup>
                            <ListGroupItem>
                                <Button outline style={{border: 'none'}} onClick={() => setCurrentView(0)}>Profile</Button>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Button outline style={{border: 'none'}} onClick={() => setCurrentView(1)}>My Toys</Button>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Button outline style={{border: 'none'}} onClick={() => setCurrentView(2)}>Add Toys</Button>
                            </ListGroupItem>
                        </ListGroup>
                    </div>
                    <div className="col-9"  style={{height: '100%', overflow:'auto'}}>
                        {
                            currentView === 0 ? <Profile user={loggedIn.loggedInUser} /> : ''
                        }
                        {
                            currentView === 1 ? <MyToys sellerId={loggedIn.loggedInUser.userId} title="My Toys" /> : ''
                        }
                        {
                            currentView === 2 ? <AddToys /> : ''
                        }
                    </div>
                </div>
            </Container>
            <Footer bottom={true} />
        </>
    )
}

export default withRouter(SellerDashboard);
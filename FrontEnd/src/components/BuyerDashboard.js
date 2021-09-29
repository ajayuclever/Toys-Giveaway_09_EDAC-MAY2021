import React, { useContext, useState } from "react";

import Footer from "./Footer";
import ChangePassword from './ChangePassword'
import Profile from './Profile'

import {
    Container,
    ListGroup,
    ListGroupItem,
    Button
} from 'reactstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

import Context from "../context/context";

const BuyerDashboard = () => {

    const {loggedIn, dispatch} = useContext(Context)

    const [currentView, setCurrentView] = useState(0)


    return (
        <>
            {/* <h1 className="text-center">Buyer Dashboard</h1> */}
                {/* <p className="text-center">{JSON.stringify(loggedIn.loggedInUser)}</p> */}
            <Container className="pt-3">
                <div className="row pb-2" style={{height: '80vh', width: '100%'}}>
                    <div className="col-3 p-4 border-end">
                        <ListGroup>
                            <ListGroupItem>
                                <Button outline style={{border: 'none'}} onClick={() => setCurrentView(0)}>Profile</Button>
                            </ListGroupItem>
                        </ListGroup>
                    </div>
                    <div className="col-9 p-2"  style={{height: '100%', overflow:'auto'}}>
                        {
                            currentView === 0 ? <Profile user={loggedIn.loggedInUser} /> : ''
                        }
                    </div>
                </div>
            </Container>
            <Footer bottom={true} />
        </>
    )
}

export default BuyerDashboard;
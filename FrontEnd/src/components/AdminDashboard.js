import React, {useContext, useState, useEffect} from "react";
import { withRouter } from "react-router";

import Footer from "./Footer";
import ChangePassword from "./ChangePassword";
import ViewBuyers from "./admin/ViewBuyers";
import ViewSellers from "./admin/ViewSellers";
import MyToys from './MyToys'

import {
    Container,
    ListGroup,
    ListGroupItem,
    Button
} from 'reactstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

import Context from "../context/context";

import { getAllBuyers, getAllSellers } from "../controllers/userController";

const ViewToys = () => {
    return (
        <h1>View Toys</h1>
    )
}



const AdminDashboard = ({history}) => {

    const {loggedIn, dispatch} = useContext(Context)

    const [buyers, setBuyers] = useState([])
    const [buyersData, setBuyersData] = useState([])

    const [sellers, setSellers] = useState([])
    const [sellersData, setSellersData] = useState([])

    useEffect(() => {
        if(!loggedIn.isLoggedIn){
            history.push('/signin')
        }
    }, [])

    useEffect(() => {
        console.log('In use Effect : ',);
       try
       {
            buyers.then(res => {
                console.log(res);
                setBuyersData(res)
            })
       }
       catch{

       }
    },[buyers])

    useEffect(() => {
        console.log('In use Effect : ',);
       try
       {
            sellers.then(res => {
                console.log(res);
                setSellersData(res)
            })
       }
       catch{

       }
    },[sellers])

    const [currentView, setCurrentView] = useState(0)

    return (
        <>
            
            <Container className="pt-3">
                <div className="row pb-2" style={{ height: '80vh',width: '100%'}}>
                    <div className="col-3 p-4 border-end">
                        <ListGroup>
                            
                            <ListGroupItem>
                                <Button outline style={{border: 'none'}} onClick={() => setCurrentView(1)}>View toys</Button>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Button outline style={{border: 'none'}} onClick={() => {
                                    setBuyers(getAllBuyers())
                                    setCurrentView(2)
                                }}>View Buyers</Button>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Button outline style={{border: 'none'}} onClick={() => {
                                    setSellers(getAllSellers())
                                    setCurrentView(3)
                                }}>View Sellers</Button>
                            </ListGroupItem>
                        </ListGroup>
                    </div>
                    <div className="col-9 px-2" style={{height: '100%', overflow:'auto'}}>
                       
                        {
                            currentView === 1 ? <MyToys title="All Toys" /> : ''
                        }
                        {
                            currentView === 2 ? <ViewBuyers buyers={buyersData} /> : ''
                        }
                        {
                            currentView === 3 ? <ViewSellers sellers={sellersData}  /> : ''
                        }
                    </div>
                </div>
            </Container>
            <Footer bottom={true} />
        </>
    )
}

export default withRouter(AdminDashboard);
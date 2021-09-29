import React, {useState, useEffect, useContext} from 'react'
import Context from '../context/context'

import {
    withRouter,
    Link
} from 'react-router-dom'

import {
    Container,
    Card,
    CardImg,
    CardText,
    CardTitle,
    CardBody,
    Button
} from 'reactstrap'

import { FaComments, FaEnvelope, FaMapMarker, FaPhone, FaUser } from 'react-icons/fa'

import 'bootstrap/dist/css/bootstrap.min.css'

import '../App.css'

import { getAllSellers } from '../controllers/userController'
import Footer from './Footer'


const Toy = ({history}) => {

    const {loggedIn, dispatch} = useContext(Context)

    const [toy, setToy] = useState({})
    const [seller, setSeller] = useState({})

    useEffect(() => {
        setToy(history.location.state.toyObj)
    }, [])

    useEffect(() => {
        if(toy)
        {
            getAllSellers()
            .then(res => {
                setSeller(res.filter(t => t.userId === toy.sellerId)[0])
            })
        }
    }, [toy])

    const handleClick = (uid, name) => {
        console.log('id: ', uid, ' name: ', name);

        const options = {
            pathname: "/chat",
            state: {
                user: {
                        uid,
                        name
                    }
            }
        }

        history.push(options)

    }

    return(
        <>
            <Container className="p-2">
            <Card className="toyCard mainToy mt-2">
                <CardImg src={`data:image/jpg;base64,${toy.toyImage}`} className="p-1" />
                <CardBody className="toyCardBody">
                    <div className="row">
                        <div className="col-6 border-end">
                            <CardTitle>
                                <h3>{toy.toyName}</h3>
                            </CardTitle>
                            <CardText className="toyCardDetails">
                                <p>{toy.toyDescription}</p>
                                <p className="text-info">Price : {toy.toyPrice} Rs</p>
                                <p>Availability : {toy.availability ? 'Available ' + toy.quantity + ' pieces' : <span className='text-danger'>Not available</span>}</p>
                                
                            </CardText>
                        </div>
                        {
                            seller ? 
                            (
                                <div className="col-6 toyCardDetails">
                                <h4>Seller Details </h4>
                                <p style={{fontSize: '20px'}}>{seller.firstName + ' '+ seller.lastName}</p>
                                <p style={{color: '#adadad'}}>
                                    <FaEnvelope className="me-2 text-warning" />{seller.email}
                                </p>
                                <p style={{color: '#adadad'}}>
                                    <FaPhone className="me-2 text-warning" />{seller.mobile}
                                </p>
                                <p style={{color: '#adadad'}}>
                                    <FaMapMarker className="me-2 text-warning" />{seller.city}
                                </p>
                                {/* <Button className="btn btn-warning">View Toy</Button> */}
                                </div>  
                            ) : ''
                        }
                    </div>
                    {
                        toy.sellerId !== loggedIn.loggedInUser.userId ?  (
                            <Button 
                                className=" btn viewToyBtn bg-primary text-white" 
                                style={{borderRadius: '50%'}}
                                onClick={() => handleClick(seller.userId, seller.firstName + ' ' +seller.lastName)}
                            >
                                <FaComments style={{fontSize: '1.5rem'}} />
                            </Button>
                        ) : ''
                    }
                    
                </CardBody>
            </Card>
            </Container>
            <Footer bottom={true} />
        </>
    )
}


export default withRouter(Toy);
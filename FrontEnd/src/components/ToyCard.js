import React, {useContext} from 'react'
import Context from '../context/context'

import {
    Redirect,
    withRouter,
    Link
} from 'react-router-dom'

import {
    Card,
    CardBody,
    CardImg,
    CardText,
    CardTitle,
    Button
} from 'reactstrap'

import 'bootstrap/dist/css/bootstrap.min.css'

const ToyCard = ({toy, history}) => {

    const {loggedIn, dispatch} = useContext(Context)

    const handleClick = t => {

        if(loggedIn.isLoggedIn)
        {
            const options = {
                pathname: "/toy",
                state: {toyObj: t}
            }

            console.log('in handle click: ', t);

            history.push(options)
        }
        else{
            history.push('/signin')
        }
        
    }

    return(
        <>
            <Card className="toyCard mt-2">
                
                <CardImg src={`data:image/jpg;base64,${toy.toyImage}`} className="p-1" onClick={() => handleClick(toy)} style={{cursor: 'pointer', width: '256px'}} />
                <CardBody className="toyCardBody">
                    <div className="row">
                        <div className="col-8">
                            <CardTitle>
                                <h3>{toy.toyName}</h3>
                            </CardTitle>
                            <CardText className="toyCardDetails">
                                <p>{toy.toyDescription}</p>
                                <p className="text-info">Price : {toy.toyPrice} Rs</p>
                                <p>Is Available : {toy.availability ? <span className="text-success">Yes</span> : <span className="text-danger">Not Available</span>}</p>
                            </CardText>
                        </div>
                        {
                            loggedIn.isLoggedIn && (
                                <div className="col-4">
                                    <Button className="viewToyBtn btn-secondary" onClick={() => handleClick(toy)}>View Toy</Button>
                                </div>
                            )
                        }
                        
                    </div>
                </CardBody>
            </Card>
        </>
    )
}

export default withRouter(ToyCard);
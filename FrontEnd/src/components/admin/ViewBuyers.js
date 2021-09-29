import React, { useEffect } from "react";

import {
    Jumbotron
} from 'reactstrap'
import { getAllBuyers } from "../../controllers/userController";

import 'bootstrap/dist/css/bootstrap.min.css'

import UserCard from "../UserCard";

const ViewBuyers = ({buyers}) => {

    return(
        <>
            <Jumbotron className="bg-secondary text-white p-4 sticky-top">
                <h3 className="display-6">Buyers</h3>
            </Jumbotron>
            <div 
                style={{
                    width:'100%'
                }}
                className="pt-2"
            >

                {
                    buyers.map(buyer => {
                        return <UserCard user={buyer} />
                    })
                }

            </div>
        </>
    )
}


export default ViewBuyers;
import React from "react";

import {
    Card,
    CardText,
    CardTitle
} from 'reactstrap'

import 'bootstrap/dist/css/bootstrap.min.css'
import { FaEnvelope, FaMapMarker, FaPhone } from "react-icons/fa";

const UserCard = ({user}) => {
    return(
        <>
            <Card className="p-2 mt-2">
                <CardTitle>
                    <h4>{user.firstName + ' ' + user.lastName}</h4>
                    <span>
                        <FaEnvelope className="me-2 text-warning"/> {user.email}
                    </span>
                    <br/>
                    <span>
                        <FaPhone className="me-2 text-warning"/> {user.mobile}
                    </span>
                    <br/>
                    <span>
                        <FaMapMarker className="me-2 text-warning"/>{user.city}
                    </span>
                </CardTitle>
            </Card>
        </>
    )
}

export default UserCard;
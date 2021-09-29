import React, { useState, useContext } from "react";
import Context from '../context/context'

import {
    Card,
    CardText,
    CardTitle, 
    Jumbotron,
    Container,
    Button,
    Label,
    Input,
    Tooltip,
    Form
} from 'reactstrap'

import {
    FaEnvelope,
    FaPhone,
    FaMapMarker,
    FaPencilAlt
} from 'react-icons/fa'

import { UPDATE_USER } from "../context/action-type";
import { updateUser } from '../controllers/userController'

import 'bootstrap/dist/css/bootstrap.min.css'





const Profile = ({user}) => {

    const {loggedIn, dispatch} = useContext(Context)

    const [view, setView] = useState(false)

    const [userId, setUserId] = useState(user.userId)
    const [firstName, setFirstName] = useState(user.firstName)
    const [lastName, setLastName] = useState(user.lastName)
    const [email, setEmail] = useState(user.email)
    const [mobile, setMobile] = useState(user.mobile)
    const [password, setPassword] = useState(user.password)
    const [gender, setGender] = useState(user.gender)
    const [city, setCity] = useState(user.city)
    const [userType, setUserType] = useState(user.userType)


    const [emailTooltip, setEmailTooltip] = useState(false)
    const [passwordTooltip, setPasswordTooltip] = useState(false)
    const [cpasswordTooltip, setCPasswordTooltip] = useState(false)

    const handleSubmit = e => {

        e.preventDefault()

        if(firstName === ''){
            return alert('First name manditory')
        }
        if(lastName === ''){
            return alert('Last name manditory')
        }
        if(email === ''){
            return alert('Email manditory')
        }
        if(mobile === ''){
            return alert('Mobile Number is manditory')
        }
        
        if(gender === ''){
            return alert('Gender manditory')
        }
        if(city === ''){
            return alert('City manditory')
        }
        if(gender === ''){
            return alert('Gender manditory')
        }
        if(userType === ''){
            return alert('User Type manditory')
        }

        let userToAdd = {
            firstName,
            lastName,
            email,
            mobile,
            password: password,
            gender,
            city,
            userType,
            userId
        }

        user = userToAdd
        dispatch({
            type: UPDATE_USER,
            payload: {user : userToAdd}
        })

        updateUser(user)
        setView(false)
        // e.target.reset()
        // signUp(userToAdd)
        // history.push("/signin")
    }

    const updateUserForm = user => {
        return(
            <Form className="form-signup" style={{width: '85%'}} onSubmit={handleSubmit}>
                <h3 className="p-1 pt-0 text-center">Update User</h3>
                    <div className="row">
                        <div className="col">
                            <Label>First Name</Label> <br/>
                            <Input 
                                type="text" 
                                onChange={e => setFirstName(e.target.value)}
                                value={firstName}
                                required
                                placeholder="First Name"
                            />
                        </div>
                        <div className="col">
                            <Label>Last Name</Label> <br/>
                            <Input 
                                type="text" 
                                onChange={e => setLastName(e.target.value)}
                                required
                                value={lastName}
                                placeholder="Last Name"
                            />
                        </div>
                    </div>
                    <Label>Email</Label> <br/>
                    <Input 
                        type="email" 
                        onChange={e => setEmail(e.target.value)}
                        required
                        value={email}
                        placeholder="Email"
                    />
                    <Label>Mobile Number</Label> <br/>
                    <Input 
                        type="number" 
                        onChange={e => {
                            
                            if(e.target.value.length > 10)
                            {
                                e.target.style.borderColor = 'red'
                                setMobile('')
                            }
                            else
                            {
                                e.target.style.borderColor = 'green'
                                setMobile(e.target.value)
                            }
                        }}
                        required
                        value={mobile}
                        placeholder="Mobile"
                        maxLength={10}
                    />
                    <Label>City</Label> <br/>
                    <Input 
                        type="text" 
                        onChange={e => setCity(e.target.value)}
                        required
                        value={city}
                        placeholder="City"
                    />
                    <div className="row">
                        <div className="col">
                            <Label>Gender</Label> <br/>
                            <Input 
                                type="radio" 
                                name="gender" 
                                value="male" 
                                onClick={e => setGender(e.target.value)}
                                checked={gender === 'male'}
                                required
                            />
                            <Label className="px-1">Male</Label>
                            <Input 
                                type="radio" 
                                name="gender" 
                                value="female" 
                                checked={gender === 'female'}
                                onClick={e => setGender(e.target.value)}
                                required
                            />
                            <Label className="px-1">Female</Label>
                            <Input 
                                type="radio" 
                                name="gender" 
                                value="other" 
                                checked={gender === 'other'}
                                onClick={e => setGender(e.target.value)}
                                required
                            />
                            <Label className="px-1">Other</Label>
                        </div>
                        <div className="col">
                            <Label className="pe-2">I am</Label> <br />
                            <Input 
                                type="radio" 
                                name="userType" 
                                value="seller" 
                                checked={userType === 'seller'}
                                onClick={e => setUserType(e.target.value)}
                                required
                            />
                            <Label className="px-1">Seller</Label>
                            <Input 
                                type="radio" 
                                name="userType" 
                                value="buyer"
                                checked={userType === 'buyer'}
                                onClick={e => setUserType(e.target.value)} 
                                required
                            />
                            <Label className="px-1">Buyer</Label>
                        </div>
                    </div>
                    
                    
                    <Button type="submit" className="btn-success mt-2">Update</Button>
                    <Button className="btn-warning mt-2" onClick={() => setView(false)} >Cancel</Button>
                </Form>
        )
    }

    const renderComp = (user) => {
        if(!view)
        {
            console.log('in if');
            return (
                <Card className="p-2">
                    <CardTitle>
                        <h4>{user.firstName + ' ' + user.lastName}</h4>
                        <Button 
                            className="float-end position-absolute top-0 end-0 mt-2 me-2 btn-warning"
                            onClick={() => setView(true)}
                        >
                            <FaPencilAlt />
                        </Button>
                        <CardText>
                            <span>
                                Unique ID : {user.userId}
                            </span>
                            <br />
                            <span>
                                <FaEnvelope className="me-2 text-warning"/>{user.email}
                            </span>
                            <br />
                            <span>
                                <FaPhone className="me-2 text-warning"/>{user.mobile}
                            </span>
                            <br/>
                            <span>
                                <FaMapMarker className="me-2 text-warning"/>{user.city}
                            </span>
                        </CardText>
                    </CardTitle>
                </Card>
            )
        }
        else
        {
            console.log('in else');
            return (
                updateUserForm()
            )
        }
    }
    

    return(
        <>
            <Jumbotron className="bg-secondary text-white p-4 sticky-top">
                <h3 className="display-6">Profile</h3>
            </Jumbotron>
            <Container className="mt-3">
                {
                    user ? renderComp(user) : ''
                }
            </Container>
        </>
    )
}

export default Profile;
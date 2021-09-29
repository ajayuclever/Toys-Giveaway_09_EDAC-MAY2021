import React, {useState} from 'react'

import { withRouter } from 'react-router'

import {
    Container,
    Form,
    Input,
    InputGroup,
    Button,
    Label,
    Tooltip
} from 'reactstrap'

import 'bootstrap/dist/css/bootstrap.min.css'
import '../App.css'
import '../footer.css'
import Footer from './Footer'

import { signUp } from '../controllers/userController'
import { Link } from 'react-router-dom'

const Signup = ({history}) => {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [mobile, setMobile] = useState('')
    const [password, setPassword] = useState('')
    const [cpassword, setCPassword] = useState('')
    const [gender, setGender] = useState('')
    const [city, setCity] = useState('')
    const [userType, setUserType] = useState('')


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
        if(cpassword === ''){
            return alert('Password manditory')
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
            password: cpassword,
            gender,
            city,
            userType
        }

        e.target.reset()
        signUp(userToAdd)
        history.push("/signin")
    }

    return(
        <>
            <Container className="pb-5">
                <h3 className="text-center py-4">Signup To New Account</h3>
                <Form className="form-signup" onSubmit={handleSubmit}>
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
                                placeholder="Last Name"
                            />
                        </div>
                    </div>
                    <Label>Email</Label> <br/>
                    <Input 
                        type="email" 
                        onChange={e => setEmail(e.target.value)}
                        required
                        placeholder="Email"
                    />
                    <Label>Mobile Number</Label> <br/>
                    <Input 
                        type="number" 
                        onChange={e => setMobile(e.target.value)}
                        required
                        placeholder="Mobile Number"
                    />
                        <Label>Password</Label> <br/>
                        <Input 
                            type="password" 
                            id="pass"
                            required
                            placeholder="Password"
                            onChange={e => {
                                let pass = e.target.value
                                if(pass !== undefined)
                                {
                                    if(pass.trim().length < 6)
                                    {
                                        e.target.style.borderColor = "#ff0000"
                                        setPasswordTooltip(true)
                                    }
                                    else
                                    {
                                        e.target.style.borderColor = "#00ff00"
                                        setPasswordTooltip(false)
                                        setPassword(e.target.value)
                                    }
                                }
                            }}
                        />
                        <Tooltip isOpen={passwordTooltip} placement="right" className="ms-2" target="pass">
                            Password must be at least 6 charecters long
                        </Tooltip>
                    <Label>Confirm Password</Label> <br/>
                    <Input 
                        type="password" 
                        id="cpass"
                        required
                        placeholder="Confirm Password"
                        onChange={e => {
                            let cpass = e.target.value
                            if(cpass === password)
                            {
                                setCPassword(cpass)
                                setCPasswordTooltip(false)
                                e.target.style.borderColor = "#00ff00"
                            }
                            else
                            {
                                e.target.style.borderColor = "#ff0000"
                                setCPassword('')
                                setCPasswordTooltip(true)
                                e.target.focus()
                            }
                        }}
                        placeholder="Password"
                    />
                    <Tooltip isOpen={cpasswordTooltip} placement="right" className="ms-2" target="cpass">
                            Confirm password not matching
                        </Tooltip>
                    <Label>City</Label> <br/>
                    <Input 
                        type="text" 
                        onChange={e => setCity(e.target.value)}
                        required
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
                                required
                            />
                            <Label className="px-1">Male</Label>
                            <Input 
                                type="radio" 
                                name="gender" 
                                value="female" 
                                onClick={e => setGender(e.target.value)}
                                required
                            />
                            <Label className="px-1">Female</Label>
                            <Input 
                                type="radio" 
                                name="gender" 
                                value="other" 
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
                                onClick={e => setUserType(e.target.value)}
                                required
                            />
                            <Label className="px-1">Seller</Label>
                            <Input 
                                type="radio" 
                                name="userType" 
                                value="buyer"
                                onClick={e => setUserType(e.target.value)} 
                                required
                            />
                            <Label className="px-1">Buyer</Label>
                        </div>
                    </div>
                    
                    
                    <Button type="submit" className="btn-success mt-2">Sign up</Button>
                </Form>
                <div className="text-center pt-1" style={{width:'100%'}}>
                    Already Have and Account ? <Link to="/signin">Sign in</Link>
                </div>
                
            </Container>
            <Footer />
        </>
    )
}

export default withRouter(Signup);
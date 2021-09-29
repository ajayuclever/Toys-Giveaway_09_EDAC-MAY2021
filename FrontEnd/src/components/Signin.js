import React, { useState, useContext, useEffect } from 'react'
import base64 from 'base-64'

import { withRouter } from 'react-router'

import {
    Container,
    Form,
    Input,
    InputGroup,
    Button,
    Label
} from 'reactstrap'

import 'bootstrap/dist/css/bootstrap.min.css'
import '../App.css'
import '../footer.css'
import Footer from './Footer'

import { signIn } from '../controllers/userController'

import { SET_LOGGED_IN } from '../context/action-type'
import Context from '../context/context'
import { Link } from 'react-router-dom'

const Signin = ({history}) => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [userType, setUserType] = useState('admin')

    const {loggedIn, dispatch} = useContext(Context)

    useEffect(() => {
        if(loggedIn.isLoggedIn)
        {
            history.push('/')
        }
    }, [])

    const handleSubmit = e => {
        e.preventDefault()

        let user = {
            email: username,
            password,
            userType
        }

        signIn(user)
        .then(res => {
            console.log('Response in sign in : ', res);

            if(!res.isLoggedIn){
                alert('Signin failed')
            }
            else{
                alert('Logged In Successfull!')

                let str = JSON.stringify(res)
                // console.log('str : ', str);

                let base64str = base64.encode(str)
                // console.log('base64str : ', base64str);

                localStorage.setItem('toys-jwt', base64str)

                // switch(res.loggedInUserType){
                //     case 'admin':
                //         history.push('/admin/dashboard')
                //         break
                //     case 'buyer':
                //         history.push('/buyer/dashboard')
                //         break
                //     case 'seller':
                //         history.push('/seller/dashboard')
                //         break
                //     default:
                //         break;
                // }
                history.push('/')

            }

            dispatch({
                type: SET_LOGGED_IN,
                payload: res
            })

        })
        .catch(err => {
            console.log('Error signing in : ', err);
        })

    }

    return(
        <>
            <Container style={{height:'80vh'}} className="position-relative">
                <h3 className="text-center pt-4">Signin To Your Account</h3>
                <Form className="form" onSubmit={handleSubmit}>
                    <Label>Username</Label> <br/>
                    <Input 
                        type="text" 
                        required
                        onChange={e => setUsername(e.target.value)}
                    />
                    <Label>Password</Label> <br/>
                    <Input 
                        type="password" 
                        required
                        onChange={e => {
                            let pass = e.target.value
                            if(pass !== undefined)
                            {
                                if(pass.trim().length < 6)
                                {
                                    e.target.style.borderColor = "#ff0000"
                                }
                                else
                                {
                                    e.target.style.borderColor = "#00ff00"
                                    setPassword(e.target.value)
                                }
                            }
                        }}
                    />
                    <div className="row py-2">
                        <div className="col">
                            <Label className="pe-2">I am</Label>
                            <Input 
                                type="radio" 
                                name="userType" 
                                value="seller" 
                                onClick={e => setUserType(e.target.value)}
                            />
                            <Label className="px-1">Seller</Label>
                            <Input 
                                type="radio" 
                                name="userType" 
                                value="buyer" 
                                onClick={e => setUserType(e.target.value)}
                            />
                            <Label className="px-1">Buyer</Label>
                        </div>
                        <div className="col">
                            
                        </div>
                    </div>
                    <Button type="submit" className="btn-success mt-2">Sign In</Button>
                </Form>
                <div className="position-absolute text-center" style={{width:'100%', bottom:'5%'}}>
                    Don't have an account? <Link to="/signup">Sign up</Link>
                </div>
            </Container>
            

            
            
            <Footer bottom={true} />
        </>
    )
}

export default withRouter(Signin);
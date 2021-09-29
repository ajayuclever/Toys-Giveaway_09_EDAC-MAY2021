import React, {useContext, useState} from "react";
import Context from "../context/context";

import { changePassword } from "../controllers/userController";

import Footer from './Footer'

import {
    Form,
    Input,
    Button,
    Tooltip,
    Jumbotron
} from 'reactstrap'

import 'bootstrap/dist/css/bootstrap.min.css'

const ChangePassword = () => {

    const {loggedIn, dispatch} = useContext(Context)

    const [pass, setPass] = useState('')
    const [cpass, setCPass] = useState('')
    const [passTooltip, setPassTooltip] = useState(false)
    const [cpassTooltip, setCPassTooltip] = useState(false)

    const handleSubmit = e => {
        e.preventDefault()

        let details = {}

        if(loggedIn.loggedInUserType === 'admin'){

            details = {
                adminId: 1,
                username: 'admin',
                password: cpass
            }

        }else{
           details = {
                userId: loggedIn.loggedInUser.userId,
                password: cpass
            }
        }
        

        let user = {
            details,
            isAdmin: loggedIn.loggedInUserType === 'admin'
        }

        changePassword(user)
        e.target.reset()
    }

    return(
        <>
        <Jumbotron className="col-4 offset-4 text-center bg-secondary text-white p-2 mt-2 sticky-top">
            <h3 className="display-6">Change Password</h3>
        </Jumbotron>
            <Form className="offset-3 mt-5 pt-5" style={{width: '50%'}} onSubmit={handleSubmit}>
                        
                        <Input 
                            type="password" 
                            id="pass"
                            required
                            className="mt-2"
                            placeholder="New Password"
                            onChange={e => {
                                let pass = e.target.value
                                if(pass !== undefined)
                                {
                                    if(pass.trim().length < 6)
                                    {
                                        e.target.style.borderColor = "#ff0000"
                                        setPassTooltip(true)
                                    }
                                    else
                                    {
                                        e.target.style.borderColor = "#00ff00"
                                        setPassTooltip(false)
                                        setPass(e.target.value)
                                    }
                                }
                            }}
                        />
                        <Tooltip isOpen={passTooltip} placement="right" className="ms-2" target="pass">
                            Password must be at least 6 charecters long
                        </Tooltip>
                    <Input 
                        type="password" 
                        id="cpass"
                        required
                        className="mt-2"
                        placeholder="Confirm New Password"
                        onChange={e => {
                            let cpass = e.target.value
                            if(cpass === pass)
                            {
                                setCPass(cpass)
                                setCPassTooltip(false)
                                e.target.style.borderColor = "#00ff00"
                            }
                            else
                            {
                                e.target.style.borderColor = "#ff0000"
                                setCPass('')
                                setCPassTooltip(true)
                                e.target.focus()
                            }
                        }}
                    />
                    <Tooltip isOpen={cpassTooltip} placement="right" className="ms-2" target="cpass">
                            Confirm password not matching
                        </Tooltip>
                <Button type="submit" className="btn-success mt-2" style={{width: '100%'}}>Submit</Button>
            </Form>
            <Footer bottom={true} />
        </>
    )
}

export default ChangePassword;
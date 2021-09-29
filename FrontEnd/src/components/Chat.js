import React, {useContext, useEffect, useState} from "react";
import { withRouter } from "react-router";
import Context from '../context/context'
import { API } from "../backend";

import {
    Button,
    Container,
    Form,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    ListGroup,
    ListGroupItem
} from 'reactstrap'

import {
    FaPaperPlane, FaSyncAlt, FaUser
} from 'react-icons/fa'

import 'bootstrap/dist/css/bootstrap.min.css'
import '../chat.css'

import Footer from "./Footer";
import { getAllChatList, getChat, sendMessage } from "../controllers/chatController";

const Chat = ({history}) => {

    const {loggedIn, dispatch} = useContext(Context)

    const [users, setUsers] = useState([])
    const [messages, setMessages] = useState([])
    const [chatList, setChatList] = useState([])
    const [activeUserName, setActiveUserName] = useState('')
    const [activeUserId, setActiveUserId] = useState('')
    const [message, setMessage] = useState('')

    useEffect(() => {

        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
          };

        let userId = loggedIn.loggedInUser.userId
        let url = API + "/chat/getuserchat/" + userId
          
        let chats = []
    
        fetch(url, requestOptions)
            .then(response => response.json())
            .then(result => {
    
                chats = result
                let list = chats.map(msg => {
                    // console.log(msg);
                    return [msg.fromUser, msg.toUser]
                })
    
                let messageUsers = [...new Set(list.flat())].filter(item => item !== userId)  // get unique user ID 
                
                console.log('msg usr :',messageUsers);
                list = []
                chats = messageUsers.map( async uid => {
                    let tmp = []
    
                    await fetch(API + "/user/getuser/" + uid, requestOptions)  // fetch every user detail in chats
                        .then(res => res.json())
                        .then(res => {
                            if(res.userId !== undefined)
                            {
                                tmp = [res.userId, res.firstName + ' ' + res.lastName]
                                list = [...list, tmp]
                                console.log('tmp : ', tmp);
                            }
                            return list
                        })
                        .then(chatNames => {
                            setChatList(chatNames)
                            console.log('expected chatlist : ', chatList);
                        })
                        return tmp
                })
                chats = list
            })
            .catch(error => console.log('error', error));
       console.log('chats : ',chats);
        
    },[])

    const getMessages = uid => {
        console.log('uid : ', uid);
        getChat(uid, loggedIn.loggedInUser.userId)
            .then(res => {
                console.log('Messages : ', res);
                setMessages([...res])
            })
    }

    useEffect(() => {
        try
        {
            if(history.location.state.user)
            {
                console.log('Passed data', history.location.state.user);
                setActiveUserId(history.location.state.user.uid)
                setActiveUserName(history.location.state.user.name)
                getMessages(history.location.state.user.uid)
            }
        }
        catch
        {
            console.log('Exception occured');
        }
    }, [])

    

    

    const handleSend = (e) => {
        e.preventDefault()

        let chat = {
            message,
            fromUser: loggedIn.loggedInUser.userId,
            toUser: activeUserId
        }

        setMessage('')
        sendMessage(chat)
            .then(() => {
                setMessages([...messages, chat])
            })
        

    }

    return(
        <>
            <Container className="p-5">
                <div className="chat-list-container">
                    <div className="row" style={{height:'100%'}}>
                        <div className="col-4 pt-3">
                                <ListGroup className="chat-list">
                                    {
                                        chatList ? 
                                            chatList.map(chat => {
                                                console.log(chat);
                                                    return (
                                                        <ListGroupItem className="ms-2" onClick={() => {
                                                            getMessages(chat[0])
                                                            setActiveUserId(chat[0])
                                                            setActiveUserName(chat[1])
                                                        }}>
                                                            {chat[1]}
                                                        </ListGroupItem> 
                                                    )
                                            })
                                        : 'No chats '
                                    }
                                </ListGroup>
                        </div>
                        <div className="col-8 position-relative chat-box" style={{background:'#fff', padding:'0px'}}>
                            
                            <div style={{flex:'1'}}>
                                {
                                    activeUserName ? (
                                        <div className="username p-1">
                                            <span className="user-icon">
                                                <FaUser fontSize="1.2rem" /> 
                                            </span>    
                                            <h4 className="mt-1 ms-1 text-white">{activeUserName}</h4>
                                            <FaSyncAlt 
                                                fontSize="1.2rem" 
                                                className="position-absolute text-white" 
                                                style={{right:'20px', cursor:'pointer'}} 
                                                onClick={() => getMessages(activeUserId)}
                                            />
                                        </div>
                                    ) : ''
                                }
                            </div>
                            <div style={{flex:'9', overflow:'auto'}} className="px-2 py-3">
                                <div 
                                    className="msgs-block" 
                                >
                                    {
                                        messages ? messages.map(msg => {
                                            return (
                                                <div className={msg.fromUser === loggedIn.loggedInUser.userId ? 'msg right' : 'msg left' }>
                                                    <div className={msg.fromUser === loggedIn.loggedInUser.userId ? 'sent' : 'recived' }>
                                                        {msg.message}
                                                    </div>
                                                </div>
                                            )
                                        }) : ''
                                    }
                                </div>
                            </div>
                            <div style={{flex:'1'}}>
                                <Form className="position-absolute bottom-0" style={{width : '100%', left:'0px', zIndex:'2'}} onSubmit={handleSend} >
                                    <div class="input-group">
                                        <Input 
                                            type="text" 
                                            class="form-control" 
                                            placeholder="Enter Your Message..." 
                                            id="basic-url" 
                                            aria-describedby="basic-addon3" 
                                            value={message}
                                            onChange={e => setMessage(e.target.value)}
                                        />
                                        <span class="input-group-text bg-success" id="basic-addon3">
                                            <button className="btn btn-success">
                                                <FaPaperPlane fontSize={20} />
                                            </button>
                                        </span>
                                    </div>
                                </Form>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </Container>

            <Footer />
        </>
    )
}

export default withRouter(Chat);
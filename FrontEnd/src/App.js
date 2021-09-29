import React, {useReducer, useEffect} from 'react'
import base64 from 'base-64'

import { SET_LOGGED_IN } from './context/action-type';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  BrowserRouter

} from 'react-router-dom'


import NavigationBar from './components/NavigationBar';
import Signin from './components/Signin';
import Signup from './components/Signup';
import Home from './components/Home';
import Toy from './components/Toy';
import AdminDashboard from './components/AdminDashboard';
import SellerDashboard from './components/SellerDashboard';
import BuyerDashboard from './components/BuyerDashboard';
import ChangePassword from './components/ChangePassword'

import Context from './context/context';
import { reducer } from './context/reducer';


import './App.css'
import Chat from './components/Chat';



function App() {

  const [loggedIn, dispatch] = useReducer(reducer, [])

  useEffect(() => {
    let session = localStorage.getItem('toys-jwt')
    console.log('SESSION : ',session);

    if(session)
    {
        let res = JSON.parse(base64.decode(session))
        console.log('Res : ', res);

        dispatch({
          type: SET_LOGGED_IN,
          payload: res
      })


    } 

  }, [])

  return (
    <>
      <Context.Provider value={{loggedIn, dispatch}}>
        <BrowserRouter>
          <NavigationBar />
          <div className="bg-design">
              <div className="circle-1"></div>
              <div className="circle-2"></div>
          </div>
          <Switch>
            <Route exact path="/">
                <Home/>
            </Route>
            <Route path="/signin">
              <Signin />
            </Route>
            <Route path="/signup">
              <Signup />
            </Route>
            <Route path="/toy">
              <Toy />
            </Route>
            <Route path="/chat">
              <Chat />
            </Route>
            <Route path="/admin/dashboard">
              <AdminDashboard />
            </Route>
            <Route path="/seller/dashboard">
              <SellerDashboard />
            </Route>
            <Route path="/buyer/dashboard">
              <BuyerDashboard />
            </Route>
            <Route path="/changepassword">
              <ChangePassword />
            </Route>
          </Switch>
        </BrowserRouter>
      </Context.Provider>
    </>
  );
}

export default App;

import { useContext } from "react";
import axios from "axios";

import { API } from "../backend";

export const signUp = user => {

    console.log('Data to be inserted : ', JSON.stringify(user));

    const requestOptions = {
        mode: 'cors',
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin':'*' 
        },
        body: JSON.stringify(user)
    };

    fetch(`${API}/user/adduser`, requestOptions)
        .then(response => {
            if(response.ok)
            {
                console.log('Success : ',response.status);
                alert('Signup Successfull')
            }
            else
            {
                console.log('Failed : ', response.status);
                alert('Signup Failed')
            }
        })
        .catch(err => console.log('Error : ',err))

}

export const signIn = async user => {

    let loggedIn = {
        isLoggedIn: false,
        loggedInUserType:"",
        loggedInUser: ""
    };

    if(user.userType === 'admin')
    {
        console.log('Admin Sign In : ', user);

        let adminObj = {
            adminId: 1,
            username: user.email,
            password: user.password
        }

        const requestOptions = {
            mode: 'cors',
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin':'*' 
            },
            body: JSON.stringify(adminObj)
        };
    
        await fetch(`${API}/admin/login`, requestOptions)
            .then(response => {
                if(response.status === 200)
                    return response.json()
            })
            .then(res => {
                console.log('Recived : ', res);
                if(res)
                {
                    loggedIn.isLoggedIn = true;
                    loggedIn.loggedInUserType = 'admin';
                    loggedIn.loggedInUser = res;
                }
            })
            .catch(err => console.log('Error : ',err))


    }
    else
    {
        console.log('User Sign In : ', user);

        const requestOptions = {
            mode: 'cors',
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin':'*' 
            },
            body: JSON.stringify(user)
        };
    
        await fetch(`${API}/user/userlogin`, requestOptions)
            .then(response => {
                if(response.status === 200)
                    return response.json()
            })
            .then(res => {
                if(res)
                {
                    loggedIn.isLoggedIn = true;
                    loggedIn.loggedInUserType = res.userType;
                    loggedIn.loggedInUser = res;
                }
            })
            .catch(err => console.log('Error : ',err))

    }

    return loggedIn
}

export const changePassword = user => {

    let api = ''

    if(user.isAdmin)
        api = `${API}/admin/changepassword`
    else
        api = `${API}/user/changepassword`

    axios.post(api, user.details, {
        headers:{
            "content-type":"application/json"
        }
    })
    .then(res => {
        if(res.status === 200)
            alert('Password Changed')
        if(res.status === 204)
        {
            console.log('No content : ', user.details);
        }
        console.log('Result in password change : ', res);
    })
    .catch(err => {
        console.log('Error in password change : ', err);
    })
    
}

export const getAllBuyers = async () => {
    let buyers = []
    await axios.get(`${API}/user/getuserbyusertype/buyer`, {
        headers: {
            'Access-Control-Allow-Origin':'*' 
        }
    })
    .then(res => {
        buyers = res.data
        return res.data
    })
    .catch(err => {
        console.log('Error : ', err);
    })

    console.log('Buyers => ', buyers);
    return buyers
}

export const getAllSellers = async () => {
    let sellers = []
    await axios.get(`${API}/user/getuserbyusertype/seller`, {
        headers: {
            'Access-Control-Allow-Origin':'*' 
        }
    })
    .then(res => {
        sellers = res.data
        return res.data
    })
    .catch(err => {
        console.log('Error : ', err);
    })

    console.log('Sellers => ', sellers);
    return sellers
}

export const updateUser = user => {

    console.log('Data to be inserted : ', JSON.stringify(user));

    const requestOptions = {
        mode: 'cors',
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin':'*' 
        },
        body: JSON.stringify(user)
    };

    fetch(`${API}/user/updateuser`, requestOptions)
        .then(response => {
            if(response.ok)
            {
                console.log('Success : ',response.status);
                alert('User Updated')
            }
            else
            {
                console.log('Failed : ', response.status);
                alert('Updation Failed')
            }
        })
        .catch(err => console.log('Error : ',err))

}



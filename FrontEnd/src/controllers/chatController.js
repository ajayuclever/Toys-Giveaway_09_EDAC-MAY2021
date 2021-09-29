import axios from "axios"
import {API} from '../backend'

export const getAllChatList = async userId => {

    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };

      let url = API + "/chat/getuserchat/" + userId
      
      let chats = []

      await fetch(url, requestOptions)
        .then(response => response.json())
        .then(result => {

            chats = result
            let list = chats.map(msg => {
                // console.log(msg);
                return [msg.fromUser, msg.toUser]
            })

            let messageUsers = [...new Set(list.flat())].filter(item => item !== userId)  // get unique user ID 
            
            console.log(messageUsers);
            list = []
            chats = messageUsers.map( async uid => {
                let tmp = []

                await fetch(API + "/user/getuser/" + uid, requestOptions)  // fetch every user detail in chats
                    .then(res => res.json())
                    .then(res => {
                        tmp = [res.userId, res.firstName + ' ' + res.lastName]
                        list.push(tmp)
                        console.log('tmp : ', tmp);
                        return list
                    })
                    return tmp
            })
            chats = list
        })
        .catch(error => console.log('error', error));
    return chats;
}

export const getChat = async (sellerId, buyerId) => {
    let messages = []
    await axios.get(`${API}/chat/getchats/${sellerId}/${buyerId}`, {
            headers: {
                'Access-Control-Allow-Origin':'*' 
            }
        })
        .then(res => {
            if(res.status)
            {
                // console.log(res);
                messages = res.data
            }
            else
            {
                alert('Something went wrong')
            }
        })
    return messages
}

export const sendMessage = async (chat) => {

    axios.post(`${API}/chat/addchat`, chat, {
        headers:{
            'Access-Control-Allow-Origin': '*',
            'Content-Type' : 'application/json'
        }
    })
    .then(res => {
        console.log('Response Status : ', res.status);
        console.log('Response : ', res);
        if(res.status !== 200)
            alert('Error occured : ', res.status)
    })
    .catch(err => {
        console.log('Error in add chat: ', err);
    })

}
import { API } from '../backend'

import axios, { post } from 'axios';

export const fetchAllToys = async () => {
    let toys = []

    await axios.get(`${API}/toys/gettoys`, {
        headers: {
            'Access-Control-Allow-Origin':'*' 
        }
    })
    .then(res => {
        console.log('Toys response : ', res.data);
        toys = res.data
    })
    .catch(err => {
        console.log('Error in fetch toys : ', err);
    })

    return toys;
}

export const addToy = toy => {

    for(let pair of toy.entries())
    {
        console.log(pair[0] + ' : ' + typeof pair[1]);
    }

    axios.post(`${API}/toys/addtoy`, toy, {
        headers:{
            'Access-Control-Allow-Origin': '*',
            'Content-Type' : 'multipart/form-data; boundary=-----A form data'
        }
    })
    .then(res => {
        console.log('Response Status : ', res.status); 
        console.log('Response : ', res);
        if(res.status === 200)
            alert('Toy added')
        else
            alert('Insertion failed')
    })
    .catch(err => {
        console.log('Error in add toy : ', err);
    })

}

export const deleteToy = toy => {
    
    axios.post(`${API}/toys/deletetoy`, toy, {
        headers:{
            'Access-Control-Allow-Origin': '*',
            'Content-Type' : 'application/json'
        }
    })
    .then(res => {
        console.log('Response Status : ', res.status);
        console.log('Response : ', res);
        if(res.status === 200)
            alert('Deleted!!')
        else
            alert('Error occured')
    })
    .catch(err => {
        console.log('Error in delete toy : ', err);
        alert('Deleted!!')
    })

}

export const updateToy = toy => {

    for(let pair of toy.entries())
    {
        console.log(pair[0] + ' : ' + typeof pair[1]);
    }
    axios.post(`${API}/toys/updatetoy`, toy, {
        headers:{
            'Access-Control-Allow-Origin': '*',
            'Content-Type' : 'multipart/form-data; boundary=-----A form data'
        }
    })
    .then(res => {
        console.log('Response Status : ', res.status);
        console.log('Response : ', res);
        if(res.status === 200)
            alert("Toy Updated")
    })
    .catch(err => {
        console.log('Error in add toy : ', err);
    })
}
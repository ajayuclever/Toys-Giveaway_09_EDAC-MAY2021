import React, { useState, useContext } from "react";

import Context from '../context/context'

import { addToy } from "../controllers/toysController";

import {
    Form,
    Button,
    Input,
    Label,
    Jumbotron
} from 'reactstrap'

import 'bootstrap/dist/css/bootstrap.min.css'


const AddToys = () => {

    const {loggedIn, dispatch} = useContext(Context)

    const [toyName, setToyName] = useState('')
    const [toyDesc, setToyDesc] = useState('')
    const [toyPrice, setToyPrice] = useState('')
    const [toyQty, setToyQty] = useState('')
    const [availability, setAvailability] = useState(true)
    const [image, setImage] = useState('')

    const imageToString = img => {

            console.log(img);

            let reader = new FileReader();
            console.log("next");
            let base64String = ''

            reader.onload = function () {
                base64String = reader.result.replace("data:", "")
                    .replace(/^.+,/, "");
                
                    setImage(base64String)
                console.log('encoded : ',base64String);
            }
            reader.readAsDataURL(img);
    }

    const handleSubmit = e => {

        e.preventDefault()

        console.log('Image => ', image);
        if(!image)
            return alert('Problem with image, please choose another')

        let formData = new FormData()

        formData.append('toyName', toyName)
        formData.append('toyDescription', toyDesc)
        formData.append('toyPrice', parseInt(toyPrice))
        formData.append('quantity', parseInt(toyQty))
        formData.append('availability', parseInt(toyQty) > 0)
        formData.append('file', image)
        formData.append('sellerId', parseInt(loggedIn.loggedInUser.userId))

        let toy = {
            toyName,
            toyDescription: toyDesc,
            toyPrice,
            quantity: toyQty,
            availability,
            toyImage: '',
            imageName: 'Img.jpg',
            sellerId: loggedIn.loggedInUser.userId
        }

        console.log('Toy Obj : ', toy);
        
        addToy(formData)

        setToyName('')
        setToyDesc('')
        setToyPrice('')
        setToyQty('')
        setImage('')
    }

    return (
        <>
            <Jumbotron className="bg-secondary text-white p-4">
                <h3 className="display-6">Add Toy</h3>
            </Jumbotron>

            <Form className="offset-3 mt-4" style={{width: '50%'}} onSubmit={handleSubmit} encType="multipart/form-data">
                <Input 
                    placeholder="Toy Name"
                    className=""
                    value={toyName}
                    onChange={e => setToyName(e.target.value)}
                />
                 <Input 
                    type="textarea"
                    placeholder="Toy Desscription"
                    className="mt-2"
                    value={toyDesc}
                    onChange={e => setToyDesc(e.target.value)}
                />
                <Input 
                    type="number"
                    placeholder="Toy Price"
                    className="mt-2"
                    value={toyPrice}
                    onChange={e => setToyPrice(e.target.value)}
                />

                <Input 
                    type="number"
                    placeholder="Toy Quantity"
                    className="mt-2"
                    value={toyQty}
                    onChange={e => setToyQty(e.target.value)}
                />
                    
                <Label className="mt-2">
                    Toy Image: <Input 
                                    type="file" 
                                    onChange={e => {
                                            console.log('uploading');
                                           imageToString(e.target.files[0])
                                        }
                                    }
                                />
                </Label>

                <br/>
                <Button className="btn-success mt-3 px-4" style={{width:'100%'}}>Add</Button>

            </Form>
        </>
    )
}

export default AddToys;
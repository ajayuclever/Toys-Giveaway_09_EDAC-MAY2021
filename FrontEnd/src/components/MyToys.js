import React, {useContext, useEffect, useState} from "react";
import Context from "../context/context";

import {
    Jumbotron,
    Card,
    CardBody,
    CardImg,
    CardText,
    CardTitle,
    Button,
    ButtonGroup,
    Label,
    Input,
    Form
} from 'reactstrap'

import {
    FaPencilAlt,
    FaTrash
} from 'react-icons/fa'

import 'bootstrap/dist/css/bootstrap.min.css'
import { fetchAllToys, deleteToy, updateToy } from "../controllers/toysController";


const MyToys = ({sellerId, title, isAdmin}) => {

    const {loggedIn, dispatch} = useContext(Context)

    const [allToys, setAllToys] = useState([])
    const [isUpdateToy, setIsUpdateToy] = useState(false)
    const [toyToUpdate, setToyToUpdate] = useState('')


    const [toyName, setToyName] = useState('')
    const [toyDesc, setToyDesc] = useState('')
    const [toyPrice, setToyPrice] = useState('')
    const [toyQty, setToyQty] = useState('')
    const [availability, setAvailability] = useState(true)
    const [image, setImage] = useState('')

    useEffect(() => {
        fetchAllToys()
        .then(res => {
            if(sellerId)
                setAllToys(res.filter(toy => parseInt(toy.sellerId) === parseInt(sellerId)))
            else
            setAllToys(res)
        })
    }, [sellerId])

    useEffect(() => {
        
        if(toyToUpdate)
        {
            console.log('toyToUpdate : ', toyToUpdate);
            setToyName(toyToUpdate.toyName)
            setToyDesc(toyToUpdate.toyDescription)
            setToyPrice(toyToUpdate.toyPrice)
            setToyQty(toyToUpdate.quantity)
            setAvailability(toyToUpdate.quantity > 0)
            setImage(toyToUpdate.toyImage)
        }
    }, [toyToUpdate])

    const removeToy = toyToRemove => {
        deleteToy(toyToRemove)
        setAllToys([...allToys.filter(t => t.toyId !== toyToRemove.toyId)])
    }

    const imageToString = img => {

        console.log(img);

        let reader = new FileReader();
        console.log("next");
        let base64String = ''

        reader.onload = function () {
            base64String = reader.result.replace("data:", "")
                .replace(/^.+,/, "");
            
            setImage(base64String)
            let temp = toyToUpdate
            temp.toyImage = base64String 
            setToyToUpdate(temp)               
            console.log('encoded : ',base64String);
        }
        reader.readAsDataURL(img);
}

    const handleSubmit = e => {
        e.preventDefault()

        if(!image)
            return alert('Problem with image, please choose another')

        let formData = new FormData()

        formData.append('toyName', toyName)
        formData.append('toyDescription', toyDesc)
        formData.append('toyPrice', parseInt(toyPrice))
        formData.append('quantity', parseInt(toyQty))
        formData.append('availability', parseInt(toyQty) > 0)
        formData.append('sellerId', parseInt(loggedIn.loggedInUser.userId))
        formData.append('toyId', toyToUpdate.toyId)
        formData.append('file', image)
        
        if(! image === '')
            formData.append('file', image, image.name)

        let toy = {
            toyName,
            toyDescription: toyDesc,
            toyPrice,
            quantity: toyQty,
            availability,
            toyImage: image,
            imageName: 'Img.jpg',
            sellerId: loggedIn.loggedInUser.userId,
            toyId: toyToUpdate.toyId
        }

        console.log('Toy Obj in update : ', toy);
       
        setAllToys([...allToys.filter(t => t.toyId !== toyToUpdate.toyId), toy]) 

        setIsUpdateToy(false)
        setToyToUpdate('')
        updateToy(formData)
    }

    return (
        <>
            <Jumbotron className="bg-secondary text-white p-4 sticky-top border-bottom">
                <h3 className="display-6">{title}</h3>
            </Jumbotron>
            {
                !isUpdateToy ?  allToys.map(toy => {
                    return (
                        <Card className="toyCard mt-2">
                            
                            <CardImg src={`data:image/jpg;base64,${toy.toyImage}`} className="p-1" />
                            <CardBody className="toyCardBody">
                                <div className="row">
                                    <div className="col-8">
                                        <CardTitle>
                                            <h3>{toy.toyName}</h3>
                                        </CardTitle>
                                        <CardText className="toyCardDetails">
                                            <p>{toy.toyDescription}</p>
                                            <p className="text-info">Price : {toy.toyPrice} Rs</p>
                                            <p>Is Available : {toy.availability ? <span className="text-success">Yes</span> : 'Not available'}</p>
                                        </CardText>
                                    </div>
                                    {
                                        loggedIn.loggedInUserType === 'seller' ? (
                                            <div className="col-4">
                                                <ButtonGroup style={{float:'right'}}>
                                                    <Button className='btn-warning' onClick={() => {
                                                        setToyToUpdate(toy)
                                                        setIsUpdateToy(true)
                                                    }}>
                                                        <FaPencilAlt className="" />
                                                    </Button> 
                                                    <Button className='btn-danger' onClick={ () => removeToy(toy)}>
                                                        <FaTrash />
                                                    </Button>
                                                </ButtonGroup>                    
                                            </div>
                                        ) : ''
                                    }
                                    {
                                        loggedIn.loggedInUserType === 'admin' ? (
                                            <div className="col-4">
                                                    <Button className='btn-danger' onClick={ () => removeToy(toy)} style={{float: 'right'}}>
                                                        <FaTrash />
                                                    </Button>
                                            </div>
                                        ) : ''
                                    }
                                </div>
                            </CardBody>
                        </Card> 
                    )
                }) : (
                    <Form className="offset-3 mt-4" style={{width: '50%'}} onSubmit={handleSubmit} encType="multipart/form-data">
                        <h3 className="p-1 pt-0 text-center">Update Toy</h3>
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
                                                    if(e.target.files[0].size > 1000000)
                                                    {
                                                        alert('File should be less than 1MB')
                                                        e.target.value = ''
                                                    }
                                                    else
                                                        imageToString(e.target.files[0])
                                                }
                                            }
                                        />
                        </Label>
                        <br/>
                        <Button className="btn-success mt-3 px-4" style={{width:'100%'}}>Update</Button>
                        <Button className="btn-warning mt-1 px-4" style={{width:'100%'}} onClick={() => setIsUpdateToy(false)}>Cancel</Button>
                    </Form>
                )
            }   
        </>
    )


}


export default MyToys;
import React, {useEffect, useState, useContext} from 'react'
import Context from '../context/context'

import {
    Container,
} from 'reactstrap'

import { fetchAllToys } from '../controllers/toysController'
import Footer from './Footer'


import ToyCard from './ToyCard'

const Home = () => {

    const [allToys, setAllToys] = useState([])

    const {loggedIn, dispatch} = useContext(Context)

    useEffect(() => {

        fetchAllToys()
            .then(res => {
                setAllToys(res)
            })
    }, [])

    return(
        <>
            {/* {
                !loggedIn.isLoggedIn && (
                    <div className="text-danger bg-light py-2 ps-3">
                        Logging to get seller details...
                    </div>
                )
            } */}
           <Container className="p-2">
                {
                   allToys.map(toy => {
                       return <ToyCard toy={toy} />
                   })
                }   
            </Container> 
            <Footer />
        </>
    )
}

export default Home;
import React from 'react'
import {Outlet} from "react-router-dom"
import Footer from './Footer'
import NavBar from './NavBar'

const RootLayout = () => {
    return (
        <div>
            <NavBar/>
            <main>
                <Outlet>
                </Outlet>
            </main>
            <Footer/>
        </div>
    )
}

export default RootLayout
import React from 'react'
import Navbar from 'responsive-sticky-nav'
import pot from '../POT.png'

const NavBar = () => {
    return (
        <div>
            <Navbar
                logo={pot}
                color="black"
                drawerColor="rgba(0,0,0,0.6)"
                burgerColor="#fff"
                drawerHeight="100vh"
            >
                <h4 style={{ margin: '2rem 0' }}><a style={{ color: 'white' }} href="/">Home</a></h4>
                <h4 style={{ margin: '2rem 0' }}><a style={{ color: 'white' }} href="/profile">Profile</a></h4>
                <h4 style={{ margin: '2rem 0' }}><a style={{ color: 'white' }} href="/write">Write</a></h4>
                <h4 style={{ margin: '1.5rem 0', padding: '0.5rem 1rem', backgroundColor: 'aliceblue', borderRadius: '10px' }}><a style={{ color: 'black' }} href="/auth">Sign In</a></h4>
            </Navbar>
        </div>
    )
}

export default NavBar

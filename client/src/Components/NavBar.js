import React, {useState, useEffect} from 'react'
import Navbar from 'responsive-sticky-nav'
import pot from '../POT.png'
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import decode from 'jwt-decode'

const NavBar = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    const logout = () => {
        dispatch({ type: 'LOGOUT' })
        history.push('/')
        setUser(null)
    }

    useEffect(() => {
        const token = user?.token
        setUser(JSON.parse(localStorage.getItem('profile')))
        if (token) {
            const decodedToken = decode(token)
            if (decodedToken.exp * 1000 < new Date().getTime()) logout();
        }
        // eslint-disable-next-line
    }, [location])

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
                {
                    user
                    ? <button className="auth-buttons" style={{border: 'none', cursor: 'pointer'}} onClick={logout}>LOGOUT</button>
                    : <h4 className="auth-buttons"><a style={{ color: 'black' }} href="/auth">Sign In</a></h4>   
                }
                
            </Navbar>
        </div>
    )
}

export default NavBar

import React from 'react';
import './Navbar.css';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

const Navbar = () => {

    return (
        <div className='header'>
            <nav>
                <Link to="/"><Button variant="text">Home</Button></Link>
                <Link to="/admin"><Button variant="text">Admin</Button></Link>
            </nav>
        </div>
    )
}

export default Navbar
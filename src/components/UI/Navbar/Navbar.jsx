import React from 'react';
import {Link} from "react-router-dom";

const Navbar = () => {
    return (
        <div className="navbar">
            <div className="navbar__links">
                <Link to="/about">About site</Link>
                <Link to="/posts">To posts list</Link>
            </div>

        </div>
    );
};

export default Navbar;
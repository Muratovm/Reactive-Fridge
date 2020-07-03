import React from 'react';
import "./menu.css";

function Menu(props){
    return(
        <nav> 
            <ul className="linear_menu item_background center">
                <li>About</li>
                <li>Skills</li>
                <li>Services</li>
                <li>Experience</li>
                <li>Education</li>
                <li>Portfolio</li>
                <li>Testimonials</li>
                <li>Contact</li>
            </ul>
        </nav>
    )
}

function Menu2(props){
    return(
        <nav> 
            <ul className="linear_menu no_background left">
                <li>About</li>
                <li>My Work</li>
                <li>Blog</li>
                <li>Contact</li>
            </ul>
        </nav>
    )
}


//export default Menu;
export default Menu2;
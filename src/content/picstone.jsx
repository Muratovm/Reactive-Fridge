import React from 'react';
import "./picstone.css";


function Picstone(props){
    var rows = props.items.map((value, index) => {
        return <div key={index}>{value}</div>
    })

    return(
        <div class="personal_info">
            <img src= {props.avatar} class = "avatar"></img>
            <div class = "personal_facts">
                <h3>General Information</h3>
                <div class = "personal_grid">
                    {rows}
                </div>
            </div>
        </div>
    );
}


export default Picstone
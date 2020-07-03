import React from 'react';
import "./square-grid.css"
import Square from './square-holder.jsx'

class Grid extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            rows: this.props.items.map((value, index) => {
                console.log(value)
                return <Square key={index} text={value}/>
            })
        }
    }

    render(){
        return <div className="square_grid"> 
        {this.state.rows} 
        </div>
    }
}

export default Grid
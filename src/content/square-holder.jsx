import React from "react"
import "./square-holder.css"


class Square extends React.Component{
    render(){
    return <button 
                className="btn_square"
                type="button">
                    {this.props.text}
            </button>
    }
}

export default Square
import React from 'react';
import Typography from '@material-ui/core/Typography';

class FoodList extends React.Component{
    constructor(props){
      super(props);
    }
    render(){
    const mystyle = {
      margin:"auto",
      width:"fit-content", 
      padding:"0",
    };
      return <ul style={mystyle}>{this.props.children} </ul>
    }
  }
  
  class FoodGroup extends React.Component{
    constructor(props){
      super(props);
    }
    render(){
      const mystyle = {
        margin:"auto",
        width:"fit-content", 
        fontSize:"30px",
        fontWeight: "bold",
        paddingBottom: "10px",
        color:"#707070",
      };
      return <Typography style={mystyle}>{this.props.children}</Typography>
    }
  }
  
  class FoodItem extends React.Component{
    constructor(props){
      super(props);
    }
    render(){
      const mystyle = {
        margin: "auto",
        width:"fit-content", 
      };
      return <div style={mystyle}>{this.props.children} </div>
    }
  }

  export {FoodItem,FoodGroup,FoodList}
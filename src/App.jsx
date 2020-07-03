import React from 'react';
import ReactDOM from 'react-dom';
//import logo from './logo.svg';
//import About from './chunks/about.jsx';
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import axios from "axios";

export const API_URL = "http://192.168.2.12:8000/api/fridge/groups";


function last_update(){
  const date = new Date(2020, 6, 10, 16, 2, 0, 0);
  const current_time = new Date();
  var timezone_diff = current_time.getTimezoneOffset()/60;
  current_time.setHours(current_time.getHours() + 4 - timezone_diff)
  let time = ""

  
  const minute_diff = current_time.getMinutes() - date.getMinutes()
  const hour_diff = current_time.getHours() - date.getHours()
  const day_diff = current_time.getDay() - date.getDay()

  const d = day_diff > 0
  const min = minute_diff > 0
  const h = hour_diff > 0
  const d_h = d && h
  const h_min = h && min

  if (d){
    time += day_diff + " days"
  }
  if(d_h){
    time += " and "
  }
  if(h){
    time += hour_diff + " h"
  }
  if(h_min && !d){
    time += " and "
    time += minute_diff + " minutes"
  }
  if(min && !d && !h){
    time += minute_diff + " minutes"
  }

return <p style={{margin:"auto",width:"fit-content", paddingBottom:"25px",fontSize:"20px"}} >Last updated: {time} ago</p>
}

const useStyles = makeStyles((theme) => ({
  root: {
    width:"300px",
    marginBottom: "35px",
    padding:"10px",
    margin:"auto",
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  paper: {
    padding: theme.spacing(6),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

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

class AppData extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      apartment: []
    };
  }

  componentDidMount() {
    axios.get(API_URL).then(res =>{
      this.setState({
        isLoaded: true,
        apartment: res.data
      });
    }
    );
  }


  render() {

    const { error, isLoaded, apartment } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      var listItems = apartment.map(function (foodgroup_item){
        //for every food group get its name
        let group_name = foodgroup_item['name']
        let foodgroup = foodgroup_item['food']
        //Create a list which initially holds the heading of the food group
        let heading = [<FoodGroup key ={group_name + "heading"}>{group_name}</FoodGroup>];
        //Iterate through the foodgroup list and generate typography for each food item
        
        const listfood = foodgroup.map(function (food){
            let name = food['item'];
            let id = food['id']
            let amount = food['amount']
            let date_string = food['updated'];
            let image = food['image']

            var right_now = new Date();
            var date = new Date(date_string); 

            var Difference_In_Time = right_now.getTime() - date.getTime(); 

            var days = Math.floor(Difference_In_Time / (1000*3600*24));
            var hours = Math.floor(((Difference_In_Time-days*(1000*3600*24)) / (1000*3600)));
            var minutes = Math.floor(((Difference_In_Time-days*(1000*3600*24)-hours*(1000*3600)) / (1000*60)));

            return(
            <FoodItem key={name}>
              <div className="tooltip">
              <img src={image} width="200px" height="200px" ></img>
                <Typography style={{fontSize:"25px"}}>
                  {amount} {name}
                  <span className="tooltiptext">{days} Days, {hours} hours and {minutes} minutes ago</span>
                  </Typography>
              </div>
            </FoodItem>
            );
          }
        );
    
        //Add the food items to the heading
        let newfood = heading.concat(<FoodList key = {group_name + " list"}>{listfood}</FoodList>);
        //Return the list inside a card
        
        return  (
          <Grid key = {group_name + " grid"} item sm={8} md={6} lg={4} style={{marginLeft:"auto",marginRight:"auto", display: "block"}}> 
                {newfood} 
          </Grid>
        )
      }
      );

      return (
        <div className="App unselectable">
            <h1 style={{margin:"auto",width:"fit-content",
          fontSize:"35px", paddingTop:"50px",
          fontWeight: "bold", color:"#707070"}} >What's in the Fridge</h1>
            
            <Grid container spacing={5} style={{paddingTop:"50px", margin:"auto"}}>
              {listItems}
            </Grid>
        </div>
      );
    }
  }
}

function App() {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return(
    <AppData/>
  )
}

export default App;

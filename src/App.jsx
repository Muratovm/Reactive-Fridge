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
import time_since from "./time/Duration";
import {FoodItem,FoodGroup,FoodList} from "./fridge/Food.jsx";

import axios from "axios";

export const API_URL = "http://192.168.2.12:8000/api/fridge/groups";

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

class AppData extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      apartment: [],
      foodTitle:'',
      foodGroup:'',
      datetime:'',
      amount: 0,
      image: null,

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
  
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  };

  handleImageChange = (e) => {
    this.setState({
      image: e.target.files[0]
    })
  };

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state);
    let form_data = new FormData();
    form_data.append('item', this.state.foodTitle);
    form_data.append('group_name', this.state.foodGroup);
    form_data.append('amount', this.state.amount);

    let date = new Date(this.state.datetime)
    let utc = date.toISOString();

    form_data.append('updated', utc);
    form_data.append('image', this.state.image, this.state.image.name);
    let url = 'http://192.168.2.12:8000/api/fridge/upload';
    axios.post(url, form_data, {
      headers: {
        'content-type': 'multipart/form-data'
      }
    })
        .then(res => {
          console.log(res.data);
          axios.get(API_URL).then(res =>{
            this.setState({
              isLoaded: true,
              apartment: res.data
            });
          });
        })
        .catch(err => console.log(err))
  };

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
            var past_date = new Date(date_string); 

            let time = time_since(past_date);

            return(
            <FoodItem key={name}>
              <div className="tooltip">
              <img src={image} width="200px" height="200px" ></img>
                <Typography style={{fontSize:"25px"}}>
                  {amount} {name}
            <span className="tooltiptext"> {time} ago</span>
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
            
        <form onSubmit={this.handleSubmit}>
          
          <label>Food: </label>
          <input type="text" id="foodTitle" value={this.state.foodTitle} onChange={this.handleChange}/><br/>
          
          <label>Group: </label>
          <input type="text" id="foodGroup" value={this.state.foodGroup} onChange={this.handleChange}/><br/>

          <label>Amount: </label>
          <input type="number" id="amount" name="amount_input" value={this.state.amount} onChange={this.handleChange}/><br/>

          <input type="datetime-local" id="datetime" name="datetime_input" value={this.state.datetime} onChange={this.handleChange}/><br/>

          <input type="file" id="image" accept="image/png, image/jpeg"  
                  onChange={this.handleImageChange} 
                  required/><br></br>
          <input type="submit"/>
        </form>

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

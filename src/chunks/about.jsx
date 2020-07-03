import React from 'react';
import "./about.css";
import avatar from '../michael_crop.png';
import Picstone from '../content/picstone';
import Recruitbutton from "../buttons/button.jsx"


function Title(props){
	return(
		<div>
			<h2>{props.title}</h2>
			<h1>{props.name}</h1>
		</div>
	)
}

function About_Text(props){
	return(
		<div>
			<h3> {props.heading} </h3>
			<p>{props.text}	</p>
		</div>
	)
}


function About(props){
    return(
        <div class = "content">
			<Picstone avatar={avatar} 
			items={
				["Name: ","Michael Muratov",
				"Location: ", "Toronto, Canada",
				"Speciality: ","Information Security"]
			}/>

			<div class="about_me_text">
				<Recruitbutton/>
				<Title 
					title="HTML5 & CSS Developer"
					name="Michael Muratov"
					/>
				<About_Text
					heading="Description"
					text="Vcard2, as the name implies it is a virtual card. 
					You can use this template for your personal use or you can use it as a resume template. 
					Instead of giving all the web elements and sections in one-page, a tabbed structure is followed. 
					With the full-width layout, the developer of this template has given you ample amount of screen space. 
					In this tabbed interface, all the related information can be accessed simultaneously. 
					Scrolling is almost reduced in the desktop view, but on the mobile devices, the user has to scroll down the pages."
					/>
			</div>
	</div>
    )
}

export default About;
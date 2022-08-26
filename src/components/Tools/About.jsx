import React, { Component } from 'react';

class About extends Component {

	
	constructor(props) {
		super(props);
		this.state = {
		   collection:[],
		}
	}
	render() {
		
		
		return(
			<div className="home-wrapper">
			
				<div className = "centerLabel">
				<h1 className = "hopeLabel" style ={{textAlign:"center"}}> About Kadena</h1>
				<h5 className = "hopeLabel" >
				SHELTER brings unique & innovative approach in tackling the on-going humanitarian crisis in Ukraine."
				 <br/>
				 <br/>				 
				 It aims to boost not only the large & small organizations that are doing humanitarian effort, 
				 but most especially it empowers the individuals & small groups who are most in need by connecting them directly to the people who has the resources. 
				 <br/>
				 <br/>
				 With SHELTER, we have the ability to know "who needs what, where?" & "who has what, where?".
				 <br/>
				 <br/>
				 We believe that in order to maximize the effectiveness of our relief effort, we need to dispatch resources with precision. 
				  <br/>
				 This is hard in every aspect because not everyone has the same needs and it changes from time to time. & in times like this, we need to make sure that
				 the resources was given to the right people at the right time.
				 <br/>
				 <br/>
				 
				 SHELTER also maximizes the use of resources by letting the members borrow with one another.
				 <br/>
				 <br/>
				 
				 Individuals now have the ability to borrow much needed resources peer-to-peer from individuals or organizations the has excess supply.
				 <br/>
				 <br/>
				 
				 This is very important in a world where "Some people have some while, some people have none."
				 <br/>
				 <br/>
				 
				 by using blockchain technology & smart contract, we can transact & track resources with high level of trust,security & authenticity.
				 these capabilities will ultimately enables the relief effort to be more effective, more flexible & impactful.
				
				 <br/>
				 <br/>
				 

				 
				 
				 
				  aims to empower not only the large organization but also small groups and individuals & encourages everyone to do social good. 
				 a person/organization could register & exchange vital supply, equipments or, man power & form alliance with others.
				 The goal of SHELTER is to strengthen the society by helping those who are in need by encouraging collaboration & sharing of resources with each other especially in small groups
				 to better fight the war crisis in Ukraine & to improve the overall health service one provides. Hospitals could also have access 
				 to unique research and technology, & could reduce cost by borrowing essential equipment to other hospitals for a given time.
				 <br/>
				 <br/>
				 By using Blockchain technology & smart contract. Hospitals could now interact & collaborate with each other 
                 without having too much commitment compared to a traditional merger. Kadena enables hospital parties involved more agility, 
                 flxebility & better opportunity to impact each other to further improve the healthcare system, patient care, supply chain management 
                 all while maintaining costs to the minimum.
				 <br/>
				 <br/>

				</h5>
				</div>
				<hr />
				<p style ={{textAlign:"center"}}><i class="fas fa-info-circle"></i> Data & information displayed in this site are mock data. It does not represent any real entity or organization. </p>
				
			</div>
		);
	}

}


export default About;
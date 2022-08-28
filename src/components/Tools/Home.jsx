import React, { Component } from 'react';

class Home extends Component {

	
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
				<h1 className = "hopeLabel" style ={{textAlign:"center"}}> What is Shelter?</h1>
				<h5 className = "hopeLabel" >
				SHELTER brings unique & innovative approach in tackling the on-going humanitarian crisis in Ukraine."

				It aims to boost not only the large & small organizations that are doing humanitarian effort, but most especially it empowers the individuals & small groups who are most in need by connecting them directly to the people who has the resources.
				<br/>
				<br/>
				With the use blockchain technology, smart contract & inter-planetary-file-system(IPFS), we now have the ability to transact & track resources with high level of trust,security & authenticity.
				These capabilities ultimately enables our relief effort to be more effective, more flexible & impactful all while remaining immutable & cencorship resistant.
				
				 <br/>
				 <br/>

				 Shelter also aims to build its own relief-team & relief-fund called "GUARDIANS" that will organize humanitarian efforts on the ground.
				 these teams along with the resources at Shelter's own inventory will be governed by the ShelterDAO.


				 Kadena is a proof of concept platform on which hospitals could register & exchange vital equipments & form alliance with other hospitals.
				 The goal of Kadena is to strengthen the healthcare system by encouraging collaboration & sharing of resources with each other
				 to help better fight the COVID-19 pandemic & to improve the overall health service one provides. Hospitals could also have access 
				 to unique research and technology, & could reduce cost by borrowing essential equipment to other hospitals for a given time.
				 <br/>
				</h5>
				</div>
				<hr />
				<p style ={{textAlign:"center"}}><i class="fas fa-info-circle"></i> Data & information displayed in this site are mock data. It does not represent any real entity or organization. </p>
				
			</div>
		);
	}

}


export default Home;

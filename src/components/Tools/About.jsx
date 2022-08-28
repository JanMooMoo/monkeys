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
				<h1 className = "hopeLabel" style ={{textAlign:"center"}}> About Shelter</h1>
				<h5 className = "hopeLabel" >
				SHELTER brings unique & innovative approach in tackling the on-going humanitarian crisis in Ukraine.
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
				 This is hard in every aspect because not everyone has the same needs and it changes from time to time. In a time of crisis, it is very important that we make sure that
				 the resources was given to the right people at the right time.
				 <br/>
				 <br/>
				 
				 SHELTER also maximizes the use of resources by letting the members borrow with one another.
				 <br/>
				 <br/>
				 
				 Individuals now have the ability to borrow much needed resources peer-to-peer from individuals or organizations that has excess supply.
				 <br/>
				 <br/>
				 
				 This is very important in a world where "Some people have some while, some people have none."
				 <br/>
				 <br/>
				 
				 by using blockchain technology, smart contract & inter-planetary-file-system(IPFS), we now have the ability to transact & track resources with high level of trust,security & authenticity.
				 These capabilities ultimately enables our relief effort to be more effective, more flexible & impactful all while remaining immutable & cencorship resistant.
				
				 <br/>
				 <br/>

				 Shelter also aims to build its own relief-team & relief-fund called "GUARDIANS" that will organize humanitarian efforts on the ground.
				 these teams along with the resources at Shelter's own inventory will be governed by the ShelterDAO.
					 
				
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
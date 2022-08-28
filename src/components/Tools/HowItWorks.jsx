import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class HowItWorks extends Component {

	render() {
		
		return(
			<div className="home-wrapper">
			
				<div className = "centerLabel">
				<h1 className = "hopeLabel" style ={{textAlign:"center"}}> How it Works?</h1>
				<h5 className = "hopeLabel" >
				 1. To be able to use Shelter, an individual, group or, DAO should send a <Link to ="/register">registration request</Link>, once approve by the admin (FUTURE DAO). you will be able to interact with the platform.  
               
				 <br/>
				 <br/>
				
				 2. There are 4 core function that you could do on Shelter.
                 <br/>
				 <br/>
                 <p style ={{textAlign:"center"}} className="Pending mt-2">* Pledge - You can use "Pledge" or donate to help, provide, fill in other people's need (ie: Shelter, Clothes, etc.).</p>
                 <div style ={{textAlign:"center"}} className="Registered mt-2">* Take - You can use "Take" to get items from a current pool given by other people (ie: Food Supply, Medical supplies, etc.).</div>
                 <div style ={{textAlign:"center"}} className="Pending mt-2">* Call For Help - You can Call For Help to post specific items/services that you need or lack for the time being so other people/organization that has extra items could help you.</div>
                 <div style ={{textAlign:"center"}} className="Registered mt-2">* Lend A Hand - You can Lend A Hand to post excess items/man power that you are willing to give/lend for the time being so others that needed it the most could use it.</div>

				 <br/>
				 <br/>
                 3. Profile - You could see the profile as well as activities of other members of Shelter. This is important for transparency.
				 <div style ={{textAlign:"center"}} className="Black mt-2"></div>
                 <br/>
                 4. Rating System -  Once approved, a person / organization will be given a base rating of 35. rating needs to be maintained to be able to perform certain functions in Shelter.
                 <div style ={{textAlign:"center"}} className="Pending mt-4">* Take - An entity should have a rating greater than 10 to take items from the pool</div>
                 <div style ={{textAlign:"center"}} className="Pending mt-2">* Call For Help - An entity should have a rating greater than 20 to be able to post items that they need.</div>
				 <div style ={{textAlign:"center"}} className="Registered mt-2">- If your rating falls below the requirement, you could Pledge or Lend-A-hand to boost your rating.</div>
				 <br/>
                 5. Reward Based Rating(+-) -  When a person / organization performs a function their rating will increase or decrease depending on the type of function that they made. This is an important & unique feature of Shelter to encourage people and organizations alike to do good & at the same time, protect the protocol from bad actors & prevent entities from taking advantage of the platform.
                 <div style ={{textAlign:"center"}} className="Unregistered mt-4">* Take: (-3 on Rating)</div>
                 <div style ={{textAlign:"center"}} className="Unregistered mt-4">* Call For Help: (-5 on Rating)</div>
                 <div style ={{textAlign:"center"}} className="Registered mt-4">* Pledge: (+3 on Rating)</div>
                 <div style ={{textAlign:"center"}} className="Registered mt-4">* Lend A Hand: (+5 on Rating)</div>
				 <br/>
				 <br/> 
				 6. ShelterDAO - As the participants grow, shelter will eventually turn into a DAO (Decentralized Autonomous Organization) where registered individuals/organizations of SHELTER will have the power to decide changes to the platform through voting
				 ShelterDAO will also govern teams,use of resources, & use of funds that will be built in the future including Shelter's own relief-team & relief-fund.
                 <br/>
				 <br/> 
				 7. Shelter Stub  - the current shelter protocol do not have a token & changes the current state of data that is stored in the shelter smart contract.It relies on transaction hash that serves as the ticket,this will change in the future in the introduction of SHELTER STUB. 
                 <div style ={{textAlign:"center"}} className="Pending mt-4">* Shelter stub is an nft (non-fungible token) based on erc-1155 that is fully ownable & transferable.</div>
                 <div style ={{textAlign:"center"}} className="Pending mt-4">* Shelter stub will serve as the ticket that is burnable in order to redeem an item or service.</div>
                 <div style ={{textAlign:"center"}} className="Pending mt-4">* Shelter stub will provide security, reliablity & validity of the ticket.</div>


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


export default HowItWorks;
import React from 'react';

function LoadingApp() {
	return (
		<div className="mt-5 text-center">
			
			<div className="home-wrapper">
			
				<div className = "centerLabel">
				<p className="mt-1 Pending">Web3 Detected! Please Make Sure You are on Rinkeby Network to Continue.</p>

				<h1 className = "hopeLabel" style ={{textAlign:"center"}}>Loading App!</h1>
				<h5 className = "hopeLabel" >
				SHELTER brings unique & innovative approach in tackling the on-going humanitarian crisis in Ukraine.
				<br/>
				<br/>
				It aims to boost not only the large & small organizations that are doing humanitarian effort, but most especially it empowers the individuals & small groups who are most in need by connecting them directly to the people who has the resources.
				<br/>
				<br/>
				With the use blockchain technology, smart contract & inter-planetary-file-system(IPFS), we now have the ability to transact & track resources with high level of trust,security & authenticity.
				These capabilities ultimately enables our relief effort to be more effective, more flexible & impactful all while remaining immutable & cencorship resistant.
				
				 <br/>
				 <br/>

				 Shelter also aims to build its own relief-team & relief-fund called "GUARDIANS" that will organize humanitarian efforts on the ground.
				 these teams along with the resources at Shelter's own inventory will be governed by the ShelterDAO.
				 <br/>
				</h5>
				</div>
				<p className="mt-1 Pending">Fetching Blockchain Data.....</p>
				<hr />
				
			</div>
	
			<p style ={{textAlign:"center"}}><i class="fas fa-info-circle"></i> Data & information displayed in this site are mock data. It does not represent any real entity or organization. </p>

		</div>
	);
}

export default LoadingApp;

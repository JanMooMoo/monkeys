import React from 'react';
import ReactDOM from 'react-dom';
import { DrizzleProvider } from "drizzle-react";
import App from './components/App';
import Web3 from "web3";

import Kadena from './config/Kadena.json';
import {
	Connect,
	useApps,
	useOrganization,
	usePermissions,
  } from '@aragon/connect-react';


const options = {
	web3:{
		customProvider: new Web3(('wss://rinkeby.infura.io/ws/v3/72e114745bbf4822b987489c119f858b')),
		
	},
	events: {
	},
	contracts: [Kadena],
	
	polls:{
		blocks:2500
	},
	
};

const aragon ={
	options:{
		network:4
	},
}
//debugger;
//const rootElement = document.getElementById("root")
//ReactDOM.render(<App/>,rootElement);
ReactDOM.render(
    <DrizzleProvider options={options} >
		<Connect location="blankdao.aragonid.eth" connector="thegraph">
		<App />
		</Connect>
	</DrizzleProvider>,
    document.getElementById("root")
);

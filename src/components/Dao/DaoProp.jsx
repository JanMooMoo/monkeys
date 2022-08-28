import React, { Component } from 'react';
import { drizzleConnect } from 'drizzle-react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import ipfs from '../../utils/ipfs';

import Loading from '../Loaders/Loading';
import {ModalPledge} from '../Modals/ModalPledge'
import {Kadena_ABI, Kadena_Address} from '../../config/Kadena';
import Web3 from 'web3';

let numeral = require('numeral');

let event_data = ''
class DaoProp extends Component {
    constructor(props, context) {
		

        super(props);
		this.contracts = context.drizzle.contracts;
		//this.event = this.contracts['Kadena'].methods.callForHelpDetails.cacheCall(this.props.id);
		//this.hospital = this.contracts['Kadena'].methods.getHospitalStatus.cacheCall(this.props.owner);

		this.account = this.props.accounts[0];
		this.state = {
			loading: false,
			loaded: false,
			description: null,
			image: null,
			ipfs_problem: false,
			location:null,
			
			commits:0,
			blocks:'',
			latestblocks:'',
			
			pledgeModalShow:false
		};
		this.isCancelled = false;
	}

	


	getImage = () => {
		let image = '/images/loading_ipfs.png';
		if (this.state.ipfs_problem) image = '/images/problem_ipfs.png';
		if (this.state.image !== null) image = this.state.image;
		return image;
	}

	getDescription = () => {
		let description = <Loading />;
		if (this.state.ipfs_problem) description = <p className="text-center mb-0 event-description"><span role="img" aria-label="monkey">🙊</span>We can not load description</p>;
		if (this.state.description !== null) {
			let text = this.state.description.length > 42 ? this.state.description.slice(0, 41) + '...' : this.state.description;
			description = <strong>{text}</strong>;
			
		}
		return description;
	}
	//get the location of Events on IPFS

	 render() {
		
		
		let body = <div className="card"><div className="card-body"><Loading /></div></div>;

	console.log(this.props.title)
			
			
			
			

			let disabled = false;
			let buttonText =<span> Pledge</span>;
			let percentageYes = numeral(this.props.yes*100/this.props.total).format('0.00')+ "%";
			let percentageNo = numeral(this.props.no*100/this.props.total).format('0.00')+ "%";


			

			//let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
			//
			//let enddate = new Date(parseInt(event_data.endDate, 10) * 1000);
			//let end_date = months[enddate.getMonth()]+ ". " + enddate.getDate() + ", " + enddate.getFullYear()


			if (Number(this.props.yesVote) >= Number(this.props.total)) {
				disabled = true;
				buttonText = <span><span role="img" aria-label="alert"> </span> Filled</span>;
			}
	
	  //Friendly URL Title
	
	
	  
			body =
				<div className="cardVote">
					
					<div className="card-header text-muted event-header ">
					<p className="small mb-0 text-center"><strong>Proposer: shelter.aragonid.eth </strong></p>
			
				
					<h4 className="small mt-4 mb-4"><strong>Proposal # {Number(this.props.id) + 1}: {this.props.title} </strong></h4>
					<li className=" list-vote-item small mt-2"><div class="progress"><div class="progress-inner" style={{"width":percentageYes }}></div><div class="progress-outer" style={{"width":"100%" }}></div><p className="  mb-0 text-center">{percentageYes}</p></div></li>
					<li className="list-vote-item  small mt-2"><div class="progress"><div class="progress-inner2" style={{"width":percentageNo }}></div><div class="progress-outer" style={{"width":"100%" }}></div><p className="  mb-0 text-center">{percentageNo}</p></div></li>

				
		
				
						
					</div>

				

					
					<div className="card-vote-footer text-muted text-center">
						
					<button className="btnVoteYes mr-2" disabled={disabled} >YES </button>
					<button className="btnVoteNo ml-2" disabled={disabled} >NO </button>				
					</div>
					
				</div>
			;
		

		return (
			<div className="col-xl-4 col-lg-6 col-md-12 col-sm-12 pb-4 d-flex align-items-stretch">
				{body}
			</div>
		);
	}

	componentDidMount() {
		this._isMounted = true;
		//this.updateIPFS();
		//this.loadBlockchain();

	}


	componentDidUpdate() {
		//this.updateIPFS();
	}


	componentWillUnmount() {
		this.isCancelled = true;
		this._isMounted = false;
	}
}

DaoProp.contextTypes = {
    drizzle: PropTypes.object
}

const mapStateToProps = state => {
    return {
		contracts: state.contracts,
		accounts: state.accounts,
		transactionStack: state.transactionStack
    };
};

const AppContainer = drizzleConnect(DaoProp, mapStateToProps);
export default AppContainer;

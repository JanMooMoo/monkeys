import React, { Component } from 'react';
import { drizzleConnect } from 'drizzle-react';
import PropTypes from 'prop-types';
import ipfs from '../../utils/ipfs';

import Loading from '../Loaders/Loading';
import html2canvas from "html2canvas";

//import exportAsImage from "exportAsImage";

var QRCode = require('qrcode.react');

/*const handleCaptureClick = useCallback(async () => {
    const canvas = await html2canvas(document.body);
    const dataURL = canvas.toDataURL('image/png');
    downloadjs(dataURL, 'download.png', 'image/png');
  }, []);*/


const customStyles = {
    ul: {
		border:'rgb(10, 53, 88)'
        
    },
    li: {
		border:'rgb(10, 53, 88)'
       
    },
    a: {
		color: '#007bff',
		
	},
	
};


class TicketQR extends Component {
    constructor(props, context) {
        super(props);
		this.contracts = context.drizzle.contracts;
		this.event = this.contracts['Kadena'].methods.provideAssistanceDetails.cacheCall(this.props.ticket.returnValues.eventId);
		this.address = null;
		this.state = {
			loading: false,
			loaded: false,
			description: null,
			image: null,
			location:null,
			ipfs_problem: false,
			card_tab: 1,
			wrong_address: false,
			capture:false
		};
		this.isCancelled = false;
	}

	updateIPFS = () => {
        console.log(this.state.loaded, this.state.loading,typeof this.props.contracts['Kadena'].provideAssistanceDetails[this.event])
		if (this.state.loaded === false && this.state.loading === false && typeof this.props.contracts['Kadena'].provideAssistanceDetails[this.event] !== 'undefined') {
			this.setState({
				loading: true
			}, () => {
				 ipfs.get(this.props.contracts['Kadena'].provideAssistanceDetails[this.event].value[8]).then((file) => {
					let data = JSON.parse(file[0].content.toString());
                    console.log(data)
					if (!this.isCancelled) {
						this.setState({
							loading: false,
							loaded: true,
							description: data.remarks,
							image: data.image,
							location:data.location
						});
					}
				}).catch(() => {
					if (!this.isCancelled) {
						this.setState({
							loading: false,
							loaded: true,
							ipfs_problem: true
						});
					}
				});
			});

		}

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
			let text = this.state.description.length > 30 ? this.state.description.slice(0, 65) + '...' : this.state.description;
			description = <strong>{text}</strong>;
			
		}
		return description;
	}

	getLocation = () => {
		let location = ''
		if (this.state.ipfs_problem) location = <p className="text-center mb-0 event-description"><span role="img" aria-label="monkey">🙊</span>We can not load location</p>;
		if (this.state.location !== null) {
			let place= this.state.location
			console.log(location)

			location = {place}
		}
		return location;
	}

	changeTab = (tab, event) => {
		event.preventDefault();
		this.setState({
			card_tab: tab
		});
	}


		//<img src="/images/qr.jpg" width="150" alt="qr code" />
	
	
	downloadQR = () => {
		/*let ticket_data = this.props.contracts['OpenEvents'].getTicket[this.ticket].value;
		let event_data = this.props.contracts['OpenEvents'].getEvent[this.event].value;
		const canvas = document.getElementById(event_data[0] +"-"+ticket_data[1]);
		console.log('c',canvas)
		const pngUrl = canvas
		  .toDataURL("image/png")
		  .replace("image/png", "image/octet-stream");
		  console.log('png',pngUrl)
		let downloadLink = document.createElement("a");
		downloadLink.href = pngUrl;
		downloadLink.download = "Hydro-Event-Ticket.png";
		document.body.appendChild(downloadLink);
		downloadLink.click();
		document.body.removeChild(downloadLink);*/




		/*card_body =
					<div>
						<div className="ticket_body">
						<p className="text-center small">
								<i className="far fa-calendar-alt"></i>
								<span className="pl-2">{event_data.title}</span>
							</p>
							<h4 className={"text-center " + timeClass}>
								<i className="far fa-calendar-alt"></i>
								<span className="pl-2">{date.toLocaleDateString()} at {date.toLocaleTimeString()}</span>
							</h4>
							{timeStatus}
							<h5 className="text-center mb-0">Your seat: {ticket_data.received}</h5>
						
						
						<div className="ticket-details">
							<img className="ticket-blockie float-left" src={image} alt={event_data[0]} />
							<p className="small text-truncate mb-2">
								Creator: <a href={"https://rinkeby.etherscan.io/address/" + event_data[9]} target="_blank">
									{event_data[9]}
								</a>
							</p>
						</div>
						</div>
					</div>*/
	  };
	  dload =(id,title)=>{
		
setTimeout(()=>this.setState({capture:true},()=>this.capture(id,title)),500)
		/*const canvas = document.getElementById(event_data[0] +"-"+ticket_data[1]);
		console.log('c',canvas)
		const pngUrl = canvas
		  .toDataURL("image/png")
		  .replace("image/png", "image/octet-stream");
		  console.log('png',pngUrl)
		let downloadLink = document.createElement("a");
		downloadLink.href = pngUrl;
		downloadLink.download = "Hydro-Event-Ticket.png";
		document.body.appendChild(downloadLink);
		downloadLink.click();
		document.body.removeChild(downloadLink);*/
		
			/*var c = document.getElementById('mycanvas');
			var t = c.getContext('2d');
			window.location.href = image;
		
			window.open('', document.getElementById('mycanvas').toDataURL());*/
			

	}

	capture(id,title){
		html2canvas(document.querySelector('#ticket-'+id)).then(canvas => {

			const pngUrl = canvas
			.toDataURL("image/png")
			.replace("image/png", "image/octet-stream");
			let downloadLink = document.createElement("a");
			downloadLink.href = pngUrl;
			downloadLink.download = title + "-Ticket.png";
			document.body.appendChild(downloadLink);
			downloadLink.click();
			document.body.removeChild(downloadLink)
				//document.body.appendChild(canvas)
			});
			this.setState({capture:false},()=>console.log())

	}
	render() {
		//console.log('event ID',this.props.ticket.returnValues.eventId)

		let border = 'ticket';
		let lineCut = 'line-cut';
		let shelterLogo = 'ticket-roof' 
		let QR= 'myTicketQR'
		if(this.state.capture){
			 border = 'ticketCapture';
			 lineCut = 'line-cut-capture'
			 shelterLogo ='ticket-roof-capture'
			 QR = 'myTicketQR-capture'
		}

		let disabled = false;
		let buttontext = 'download ticket'
		if(this.state.loading||!this.state.loaded||this.state.ipfs_problem){
			 disabled = true;
			 buttontext = 'cannot download'
		}


		let body = <div></div>;

		if (typeof this.props.contracts['Kadena'].provideAssistanceDetails[this.event] !== 'undefined' && this.props.contracts['Kadena'].provideAssistanceDetails[this.event].value ) {
            console.log(this.props.ticket)
			let image = this.getImage();
			let location = this.getLocation();


            let ticket_data = this.props.ticket.returnValues
			let event_data = this.props.contracts['Kadena'].provideAssistanceDetails[this.event].value;
			console.log('ticks',this.props.ticket.transactionHash,this.props.ticket.blockNumber,this.props.ticket.returnValues.eventId)
		/*	let rawTitle = event_data[0];
      		var titleRemovedSpaces = rawTitle;
	  		titleRemovedSpaces = titleRemovedSpaces.replace(/ /g, '-');

      		var pagetitle = titleRemovedSpaces.toLowerCase()
      		.split(' ')
      		.map((s) => s.charAt(0).toUpperCase() + s.substring(1))
			.join(' ');
			let titleURL = "/event/"+pagetitle+"/" + ticket_data[0];*/

			let card_body;

			    //let description = this.getDescription();
	

				let date = new Date(parseInt(event_data.endDate, 10) * 1000);
				let timeStatus, timeClass;

				if (date.getTime() < new Date().getTime()) {
					timeStatus = <p className="text-center small"><span role="img" aria-label="alert">⚠️</span> Ticket Expired</p>;
					timeClass = 'text-danger';
				}

				card_body =  <div className="ticket-wrap"><div class={border} id={'ticket-'+this.props.ticket.transactionHash}>					
                             	<div class="ticket-content-wrapper" >
									<h1 className="ticket-title text-center">{event_data.title}</h1>
								<div className={lineCut}></div>
								{this.state.capture?<div className="ticket-hash-capture"><p>***************</p></div>:<div className="ticket-hash"><p> {this.props.ticket.transactionHash}</p></div>}
  								<div className="ticket-details">
									<div className='ticket-blockie-wrapper '>	
										<img className="ticket-blockie" src={image} alt={event_data[0]} />
										<div className="menu mt-4">
					
					
						<div className = {shelterLogo}/>
						<h5 className="ticket-shelter">SHelteR</h5>
						</div>
					
										<h1 className="ticket-organizer">Organized By: {ticket_data.sender}</h1>

									</div>
									<div className="ticket-item"><p>Item</p> <h1>{ticket_data.item} - {ticket_data.received}x  </h1></div>
									<div className="ticket-validity"><p>Valid Until</p> <h1>{date.toDateString().slice(4)+' - '+date.toLocaleTimeString().slice(0,5)} {date.toLocaleTimeString().slice(8,11)}</h1></div>
									<div className="ticket-location"><p>{this.state.location}.</p></div>
								
									<p className={QR + " text-center"}>
									<QRCode 
										id={event_data[0] +"-"+ticket_data[1]}
										value={'/validator/'+this.props.ticket.transactionHash+'/'+this.props.ticket.blockNumber+'/'+this.props.ticket.returnValues.eventId}
										size={90}
										level={"L"}
										bgColor="black" 
										fgColor="white" 
										imageSettings = {{
										src:'/images/hydro.png',
										height:20,
										width:20,
										x: null,
    									y:75,
    									excavate: false,}}/></p>	
								<h1 className="ticket-quantity">{ticket_data.received}x  </h1>


								</div>

  								</div>
							</div>

							<button className = "ticket-download-button" onClick={()=>this.dload(this.props.ticket.transactionHash,event_data.title)} disabled={disabled}>{buttontext}</button>
																		  
							</div>

				;
			 

			body =
				<div className="ticket_wrapper">
					
					{card_body}
				</div>
			;
		}

		return (
			
			<div className="col-lg-4 pb-4 d-flex align-items-stretch">
				{body}
			</div>
		);
	}

	clear(){
		this.setState({
			loading: false,
			loaded: false,
			description: null,
			image: null,
			location:null,
			ipfs_problem: false,
			wrong_address: false,
			capture:false
		},()=>console.log())
	}

	componentDidUpdate(prevProps) {
	
		if(prevProps.ticket.transactionHash !== this.props.ticket.transactionHash){
			this.event = this.contracts['Kadena'].methods.provideAssistanceDetails.cacheCall(this.props.ticket.returnValues.eventId);
			this.clear()
		}
		this.updateIPFS();
		
	}

	componentDidMount() {
		this.updateIPFS();
	}

	componentWillUnmount() {
		this.isCancelled = true;
	}
}

TicketQR.contextTypes = {
    drizzle: PropTypes.object
}

const mapStateToProps = state => {
    return {
		contracts: state.contracts,
		accounts: state.accounts
    };
};

const AppContainer = drizzleConnect(TicketQR, mapStateToProps);
export default AppContainer;
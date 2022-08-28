import React, { Component } from 'react';
import {Kadena_ABI, Kadena_Address} from '../../config/Kadena';
import Web3 from 'web3';
import TicketQR from './TicketQR';
import TicketQRGive from './TicketQRGive';
import HydroLoader from '../Loaders/HydroLoader';
import JwPagination from 'jw-react-pagination';
import {connect, ConnectionError} from '@aragon/connect'




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
	
}
class MyTickets extends Component {
    constructor(props) {
        super(props);
         
            this.state = {
                loading: true,
                commited:[],
                Kadena:'',
                Shelter:'',
                pageTicket:[],
                givePage:false,
                expiredPage:false
  
            };
            this.onChangePage = this.onChangePage.bind(this);

        }
    componentDidMount() {
		this._isMounted = true;
            setTimeout(()=>this.loadblockhain(),1000);
        
    }

    onChangePage(pageTicket) {
		this.setState({ pageTicket },()=>console.log());
	}

    
    async loadblockhain(){
   
        
        
  const web3 = new Web3(new Web3.providers.WebsocketProvider('wss://rinkeby.infura.io/ws/v3/72e114745bbf4822b987489c119f858b'));
	const Kadena =  new web3.eth.Contract(Kadena_ABI, Kadena_Address);
    this.setState({Shelter:Kadena})
    if (this._isMounted){
    this.setState({Kadena:Kadena});}

    const blockNumber = await web3.eth.getBlockNumber();
    if (this._isMounted){
    this.setState({
		blocks:blockNumber - 50000,
	    latestblocks:blockNumber - 1,
		commited:[]
		});
	}
    
    //let tx = await web3.eth.getTransactionReceipt('0x7a53de1b6262321367ca65944eec5d2b0488324ce2a241c765e6892e2a86cf7b') 
   // console.log('sadasdasd',tx)
   this.loadTickets()
  
    }


    loadTickets(){
        if(!this.state.givePage){
        this.state.Shelter.getPastEvents("Taken",{filter:{takenBy:this.props.account},fromBlock: 5000000, toBlock:'latest'})
        .then(events=>{

        if(this._isMounted){
        var newest = events;
        var newsort= newest.concat().sort((a,b)=> b.blockNumber- a.blockNumber);
       
        this.setState({commited:newsort,loading:false},()=>console.log());
        
          }
        }).catch((err)=>console.error(err))
        }

        else{
        
                this.state.Shelter.getPastEvents("Pledged",{filter:{pledgedBy:this.props.account},fromBlock: 5000000, toBlock:'latest'})
                .then(events=>{
        
                if(this._isMounted){
                var newest = events;
                var newsort= newest.concat().sort((a,b)=> b.blockNumber- a.blockNumber);
               
                this.setState({commited:newsort,loading:false},()=>console.log());
                
                  }
                }).catch((err)=>console.error(err))
        }
    }


    parseDate = (pledge_date) => {
        let date = new Date(parseInt(pledge_date, 10) * 1000);
        let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
        let pledgeDate = months[date.getMonth()]+ ". " + date.getDate() + ", " + date.getFullYear() 
        return pledgeDate    
    }

    friendlyUrl = (hospitalName,EthAddress) =>{
        let rawTitle = hospitalName;
      	var titleRemovedSpaces = rawTitle;
	  	titleRemovedSpaces = titleRemovedSpaces.replace(/ /g, '-');

      	var pagetitle = titleRemovedSpaces.toLowerCase()
      	.split(' ')
      	.map((s) => s.charAt(0).toUpperCase() + s.substring(1))
          .join(' ');
            
          //window.location.href = "/hospital/"+pagetitle+"/"+EthAddress;
          
          window.open(
            "/member/"+pagetitle+"/"+EthAddress,           
            '_blank' // <- This is what makes it open in a new window.
          );
    }


    ticketChange(prevState){
            this.setState({givePage:!this.state.givePage},()=>this.loadTickets())
    }

render(){


    let body = ''

    let givePage = false;
    let takePage = true;
    if(this.state.givePage){

        givePage = true;
        takePage = false;
    }

    if(this.state.loading){
     body = <div  className="row user-list mt-4">
        <HydroLoader/>
    </div>
    }

    
    else if(this.state.commited.length === 0 && !this.state.loading){
        body = <div style ={{textAlign:"center"}}>
            <h5 className="linkDisplay mt-5 small"><strong>No Valid Ticket</strong></h5>
        </div>
        }
    


        else body =
        <div className="row user-list mt-4">
                
        {this.state.pageTicket.map((taken,index)=>( 
         <div > 
              
       
         {this.state.givePage?<TicketQRGive Shelter = {this.state.Shelter} ticket = {taken}/>:<TicketQR Shelter = {this.state.Shelter} ticket = {taken}/>}

         
  				
              
              </div> ))}        
              </div>
    
    

	return (
            <div className="retract-page-inner-wrapper-alternative">

            <br/><br />
            <p style ={{textAlign:"center"}}><i class="fas fa-info-circle"></i> Present valid ticket to gain access to events & services or, to redeem items from the organizer. </p>
		   <hr/>
           <button className="btn btn-outline-dark mt-2" onClick={()=>this.ticketChange()} disabled={takePage}>Taken Tickets</button>
              <button className="btn btn-outline-dark mt-2 ml-3" onClick={()=>this.ticketChange()} disabled={givePage}>Given Tickets</button>  
            {body}
            <div className="pagination">           
                <JwPagination items={this.state.commited} onChangePage={this.onChangePage} maxPages={5} pageSize={2} styles={customStyles} />					
	        </div>
            <hr/>
		   <p style ={{textAlign:"center"}}><i class="fas fa-info-circle"></i> Data & information displayed in this site are mock data. It does not represent or in any way connected to real entity or organization. </p>					
    </div>

                  
             
              
             
             
	);
}
}
export default MyTickets;

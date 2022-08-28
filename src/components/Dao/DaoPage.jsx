import React, { Component } from 'react';
import { drizzleConnect } from 'drizzle-react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// Import dApp Components
import HydroLoader from '../Loaders/HydroLoader';
import DaoProp from './DaoProp';
import Web3 from 'web3';
import {Kadena_ABI, Kadena_Address} from '../../config/Kadena';


const web3 = new Web3(new Web3.providers.WebsocketProvider('wss://rinkeby.infura.io/ws/v3/72e114745bbf4822b987489c119f858b')); 

class DaoPage extends Component
{
  constructor(props, context)
  {
      super(props);

      this.state = {
        blocks : 5000000,
        latestblocks :6000000,
        loadingchain : false,
        active_length : '',
        isOldestFirst:false,
        event_copy:[],
        Kadena:[],
        needHelpActive:[],
        pledgeModalShow: false,

        dateNow:0,
        isActive:true,
        search:"title",
        proposal:[ {id:'0',title:'dispatch 20,000 cartons of milk to be donated in mariupol from our Shelter-Reserve?',yes:9,no:1,total:10},
        {id:'1',title:'Intergrate Aragon-Connect to Shelter Web-App for easier and seamless DAO Voting.',yes:6,no:1,total:10},
        {id:'2',title:'Spend $10,000 from Shelter-Fund to hire 5 on-call psychologist that could assist shelter members regarding mental health?',yes:4,no:4,total:10},

        {id:'3',title:'Hide Shelter members address in front-end/UI to non-members?',yes:3,no:7,total:10},
        {id:'4',title:'Initiate partnership with UKRAINE VANGUARD to boost and help Shelter-Relief team in logistic?',yes:10,no:0,total:10},
        {id:'5',title:'Accept the offer of UniqueHorn Capital to buy Shelter Web-app for $24-Million?',yes:1,no:9,total:10}]



      };

	    this.contracts = context.drizzle.contracts;
        this.Count = this.contracts['Kadena'].methods.getNeededCount.cacheCall();

	    this.perPage = 6;
      this.toggleSortDate = this.toggleSortDate.bind(this);
	}

  


  //Loads Blockhain Data,
  async loadBlockchain(){
   
    const dateTime = Date.now();
    const Kadena  =  new web3.eth.Contract(Kadena_ABI, Kadena_Address);
		this.setState({Kadena:Kadena});
		
    const blockNumber = await web3.eth.getBlockNumber();
    
    if (this._isMounted){
    this.setState({blocks:blockNumber - 50000});
    this.setState({latestblocks:blockNumber - 1,dateNow:Math.floor(dateTime / 1000)});
    this.getActiveEvents()

    this.state.Kadena.events.NeedAHand({fromBlock: this.state.blockNumber, toBlock:'latest'})
    .on('data', (log) => setTimeout(()=> {
    if(this.state.isActive){
    this.setState({needHelpActive:[...this.state.needHelpActive,log]});
    var newest = this.state.needHelpActive
    var newsort= newest.concat().sort((a,b)=> b.blockNumber- a.blockNumber);

    this.setState({needHelpActive:newsort,event_copy:newsort});
    this.setState({active_length:this.state.needHelpActive.length})}
     } ,10000))
    }
     
    }

  


  ActiveEvent=()=>{
		this.setState({
			loadingchain:true,isActive: true,
		})
     
		this.getActiveEvents()
		this.props.history.push("/needhelp/"+1)
    }
    
  PastEvent=()=>{
      this.setState({
        loadingchain:true,isActive: false,
      })
      this.getActiveEvents()
      this.props.history.push("/needhelp/"+1)
      }


  
  searchChange = (event) =>{
    let search = event.target.value;

  this.setState({
    search: search
    },()=>console.log())
  }

 //Search Active Events By Name
  


  //Sort Active Events By Date(Newest/Oldest)
  toggleSortDate=(e)=>{
    let {value} = e.target
    this.setState({value},()=>{
    const{needHelpActive}=this.state
    const{ended}=needHelpActive
    var newPolls = ended

     if(this.state.isOldestFirst){
        newPolls = needHelpActive.concat().sort((a,b)=> b.returnValues.eventId - a.returnValues.eventId)
        }
    else {
        newPolls = needHelpActive.concat().sort((a,b)=> a.returnValues.eventId - b.returnValues.eventId)
      }

      this.setState({
      isOldestFirst: !this.state.isOldestFirst,
      needHelpActive:newPolls
      });
    })}



	render()
  {
    
 
console.log('proposal',this.state.proposal[1].id)
    
    let body = '';
    let header = "Active Needs";
    let loader = <HydroLoader/>


    if (typeof this.props.contracts['Kadena'].getNeededCount[this.Count] !== 'undefined' && this.state.active_length !== 'undefined') {
      
      let count = 6;

        
				let currentPage = Number(this.props.match.params.page);
				if (isNaN(currentPage) || currentPage < 1) currentPage = 1;

				let end = currentPage * this.perPage;
				let start = end - this.perPage;
				if (end > count) end = count;
				let pages = Math.ceil(count / this.perPage);

        let events_list = [];
        if(this.state.proposal !== undefined){
        for (let i = start; i < end; i++) {
          events_list.push(<DaoProp 

            key={this.state.proposal[i].id}
            id={this.state.proposal[i].id}
            title={this.state.proposal[i].title}
            yes={this.state.proposal[i].yes}
            no={this.state.proposal[i].no}
            total={this.state.proposal[i].total}

            />);
          }
        } 
        

        //events_list.reverse();

				let pagination = '';
				if (pages > 1) {
          let links = [];
          
          if (pages > 5 && currentPage >= 3){
            for (let i = currentPage - 2; i <= currentPage + 2 && i<=pages; i++) {
                 let active = i === currentPage ? 'active' : '';
               links.push(
                <li className={"page-item " + active} key={i}>
								<Link to={"/needhelp/" + i}  className="page-link">{i}</Link>
                </li>
              );
            } 
          }

          else if (pages > 5 && currentPage < 3){
            for (let i = 1 ; i <= 5 && i<=pages; i++) {
              let active = i === currentPage ? 'active' : '';
              links.push(
                <li className={"page-item " + active} key={i}>
								<Link to={"/needhelp/" + i}  className="page-link">{i}</Link>
                </li>
              );
            } 
          } 
					else{
            for (let i = 1; i <= pages; i++) {
						let active = i === currentPage ? 'active' : '';
						links.push(
							<li className={"page-item " + active} key={i}>
								<Link to={"/needhelp/" + i}  className="page-link">{i}</Link>
							</li>
						);
					}
        }
					pagination =
						<nav>
							<ul className="pagination justify-content-center">
								{links}
							</ul>
						</nav>
					;
				}

        body =<div >
						<div className="row user-list mt-4">
              
							{this.state.loadingchain? loader:events_list}
						</div>

            {events_list.length === 0 && !this.state.loadingchain && <p className="text-center not-found"><span role="img" aria-label="thinking">🤔</span>&nbsp;No events found. <Link to={'/register'}>Try creating one.</Link></p>}
						{pagination}
					</div>

   
				;
			}
    

		return(
      <React.Fragment>
     

			<div className="retract-page-inner-wrapper-alternative">


      <br/><br />
    
     

      <div>
        

        <div className="row row_mobile">
         <h2 className="col-lg-10 col-md-9 col-sm-8"><i className="fa fa-calendar-alt"></i> DAO Proposals</h2>
         
        </div>
        <div className="row row_mobile">
        <span className="col-lg-10 col-md-9 col-sm-8"></span>
        
        {this.state.needHelpActive.length !== this.state.active_length && this.state.needHelpActive.length !== 0 && <h5 className="result col-lg-2 col-md-3 col-sm-3">Results: {this.state.needHelpActive.length}</h5>}
        <div >
        </div>
        </div>
        <hr/>
        <div className="topics-wrapper">
        <h3 style ={{textAlign:"center"}} className="mt-4 mb-4">Dao Proposals Sample Page.</h3>

           <br/>
           
 
 
       </div>

         {body}
         <br /><br />

      <div className="topics-wrapper">
           
          <br/>
          
          <p style ={{textAlign:"center"}}><i class="fas fa-info-circle"></i> Data & information displayed in this site are mock data. It does not represent or in any way connected to real entity or organization. </p>


      </div>
  
         </div></div>
         </React.Fragment>
      
		);
  }

  componentDidMount() {
    this._isMounted = true;
   // this.loadBlockchain();
  
  }

  componentWillUnmount() {
    this.isCancelled = true;
    this._isMounted = false;
  }




}

DaoPage.contextTypes = {
    drizzle: PropTypes.object
}

const mapStateToProps = state =>
{
    return {
		contracts: state.contracts,
		accounts: state.accounts
    };
};

const AppContainer = drizzleConnect(DaoPage, mapStateToProps);
export default AppContainer;

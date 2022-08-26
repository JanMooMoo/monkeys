import React, { Component } from 'react';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';


let numeral = require('numeral');

class LendAHand extends Component {
	constructor(props) {
		super(props);

		this.form = {};

		this.state = {
			
			title_length: 0,
			description_length: 0,
		
			wrong_file: false,
			file_name: null,
			file: null,
			fileImg: "/images/event-placeholder.jpg",
			form_validation: [],

			title: '',
			description:'',
            category:"basic",
            item:"Food",
            amount:0,
            return:"false",
            minimum:0,
            endtime:'',

			address:'',
            
            basic:["Food", "Baby Food", "Shelter", "Milk", "Clean Water"],
            essential:["Clothes For Men", "Clothes For Women", "Clothes For Children", "Clothes For Babies","Diapers", "Blankets", "Transportation"],
            health:["Antibiotics","Bandages","Gloves","Mask","Stretcher","Vitamins & Supplements","Wipes"],
            protection:["Power Banks", "Torches", "Flashlight", "Generator", "Body Armour", "Fire Resistant Clothes", "Helmet"],
            human:["Medical Doctor", "Nurse", "Psychiatrist", "Psychologist", "Engineer", "Military", "Home Builder", "Web Programmer", "Cook", "Veterinarian", "Dentists"],
			event:["Food", "Medicine", "Rebuilding", "Relocation", "Fund Raising"], 
            
            dateDisplay:new Date(parseInt('1577952000', 10) * 1000),
            enddateDisplay:new Date(parseInt('1577952000', 10) * 1000)
		}
	}


	//handleImage
	handleFile = (event) => {
		let file = event.target.files[0];

		if (
			file.size > 1024 * 1024 ||
			(file.type !== 'image/jpeg' && file.type !== 'image/png')
		) {
			this.setState({
				wrong_file: true,
				file: null
			});
		} else {
			this.setState({
				wrong_file: false,
				file_name: file.name,
				file: file,
				fileImg: URL.createObjectURL(event.target.files[0])
			});
		}
	}
	//Name
	titleChange = (event) => {
		let title = event.target.value;
		if (title.length > 80) {
			title = title.slice(0, 80);
		}
		this.setState({
			title: title,
			title_length: title.length
		});
	}


	//Remarks
	descriptionChange = (event) => {
		let description = event.target.value;
		if (description.length > 500) {
			description = description.slice(0, 500);
		}
		this.setState({
			description: description,
			description_length: description.length
		});
	}

	addressChange = (event) => {
		let address = event.target.value;
		if (address.length > 50) {
			address = address.slice(0, 50);
		}
		this.setState({
			address: address,
			address_length: address.length
		});
	}



    //amountChange
    amountChange = (event) => {		
		let amount = this.form.amount.value;
		this.setState({
			amount: amount
		},()=>console.log());
		
	}

	//Minimum amountChange
    minAmountChange = () => {		
		let minAmount = this.form.minAmount.value;
		this.setState({
			minimum: minAmount
		},()=>console.log());
		
	}
    
    //category
    categoryChange = (event) =>{
        let category = event.target.value;

		this.setState({
			category: category
        },()=>this.itemChange())
    }
   
    //itemName
    itemChange = (event) =>{
        let item = this.form.item.value;

		this.setState({
			item: item
		},()=>(console.log()));
    }

    //Return
    handleReturn = (event) =>{
        let returns = event.target.value;
        this.setState({
			return: returns
			
		},()=>console.log());
    }

    //EndDate
    handleEndDate = (date) => {
		if (typeof date === 'object' && date.isValid()) {
			this.setState({
                endtime: date.unix(),
                enddateDisplay: new Date(parseInt(date.unix(), 10) * 1000)		
            },()=>console.log())
		}
	}

	//submit
	handleForm = (event) => {
        event.preventDefault();
    
		let form_validation = [];
        if (this.state.title === '') form_validation.push('name');
        if (this.state.category === '') form_validation.push('category');
        if (this.form.description.value === '') form_validation.push('description');
        if (this.state.item === '') form_validation.push('item');
		if (this.form.amount.value === '') form_validation.push('amount');
		if (this.form.minAmount.value === '') form_validation.push('minAmount');
        if (this.state.return === '') form_validation.push('return');
        if (this.state.endtime === '') form_validation.push('End');
		if (this.state.wrong_file === true || this.state.file === null) form_validation.push('image');
		if (this.form.address.value === '') form_validation.push('address');

		
		this.setState({
			form_validation: form_validation
        });
        
		if (form_validation.length === 0) {
			this.props.lendAHand(
                this.state.title,
                this.state.category,
				this.state.item,
                this.state.amount,
                this.state.return,
				this.state.minimum,
                this.state.endtime,
                this.state.description,
				this.state.file,
				this.state.address

			);
		}
	}


	render() {
		
		let percentage = numeral(this.state.amount*100/this.state.amount).format('0.00') + "%";
		let dateTime = Date.now();
		let Now = Math.floor(dateTime / 1000);

		let file_label = !this.state.wrong_file && this.state.file_name !== '' ? this.state.file_name : 'Select file';

		let warning = {
            name: this.state.form_validation.indexOf('name') === -1 ? '' : 'is-invalid',
            category: this.state.form_validation.indexOf('category') === -1 ? '' : 'is-invalid', 
			item: this.state.form_validation.indexOf('item') === -1 ? '' : 'is-invalid',
			amount: this.state.form_validation.indexOf('amount') === -1 ? '' : 'is-invalid',
			minAmount: this.state.form_validation.indexOf('minAmount') === -1 ? '' : 'is-invalid',
            endtime: this.state.form_validation.indexOf('End') === -1 ? '' : 'is-invalid',
            description:this.state.form_validation.indexOf('description') === -1 ? '' : 'is-invalid',
			address:this.state.form_validation.indexOf('address') === -1 ? '' : 'is-invalid',
            image: this.state.form_validation.indexOf('image') === -1 && !this.state.wrong_file ? '' : 'is-invalid',
        };

		let alert;
		let disabled = false;
		if (this.state.form_validation.length > 0) {
			alert = <div className="alert alert-dark mt-2" role="alert">Required fields are missed.</div>
			disabled = true
		}

		if (Number(this.state.amount) < Number(this.state.minimum)) {
			alert = <div className="alert alert-dark mt-2" role="alert">Minimum is greater than amount.</div>
			disabled = true
		}

		if (Now > this.state.endtime) {
			alert = <div className="alert alert-dark mt-2" role="alert">End date should be in the future.</div>
			disabled = true
		}

		
		if(this.props.account.length === 0){
			disabled = true;
        } 
		
        let itemOption = ''
        
		if (this.state.category === "basic"){
            itemOption = 
            this.state.basic.sort((a,b)=>a.localeCompare(b)).map((basic,index)=>( <option value={basic} key={index}>{basic}</option>))}	
        
        else if (this.state.category === "essential"){
            itemOption = this.state.essential.sort((a,b)=>a.localeCompare(b)).map((essential,index)=>( <option value={essential} key={index}>{essential}</option>))        
        }
        else if (this.state.category === "health"){
            itemOption = this.state.health.sort((a,b)=>a.localeCompare(b)).map((health,index)=>( <option value={health} key={index}>{health}</option>))        
        }
        else if (this.state.category === "protection"){
            itemOption = this.state.protection.sort((a,b)=>a.localeCompare(b)).map((protection,index)=>( <option value={protection} key={index}>{protection}</option>))        
        }        
        else if (this.state.category === "human"){
            itemOption = this.state.human.sort((a,b)=>a.localeCompare(b)).map((human,index)=>( <option value={human} key={index}>{human}</option>))   
        }

		else if (this.state.category === "event"){
            itemOption = this.state.event.sort((a,b)=>a.localeCompare(b)).map((event,index)=>( <option value={event} key={index}>{event}</option>))   
        }


		return (
			<React.Fragment>
			<div className="home-wrapper mb-5 col-sm-12">		
			<h2><i className="fa fa-edit"></i> Lend A Hand</h2>
			</div>

		
			<div className="col col-xl-8 col-lg-8 col-md-12 col-sm-12">
			
            <form>
				<div className="form-group">
					<label htmlFor="name">Title:</label>
					<input type="text" className={"form-control " + warning.name} id="name" title="Hospital Name" value={this.state.title} onChange={this.titleChange} autoComplete="off" />
					<small className="form-text text-muted">{this.state.title_length}/80 characters available.</small>
				</div>

                <div className="form-group">
					<label htmlFor="category">Category:</label>
					<select className="form-control" id="category" title="category" onChange={this.categoryChange}>
						<option value="basic" key="1">Basic Needs</option>
						<option value="essential" key="2">Clothes & Essential</option>
						<option value="health" key="3">Health & Medicine</option>
						<option value="protection" key="4">Protective Equipment</option>
                        <option value="human" key="5">Human Resource</option>
                        <option value="event" key="6">Events & Community Program</option>
					</select>
				</div>

                <div className="form-group">
                <label htmlFor="item">Options:</label>
                <select className="form-control" id="item" title="item"  ref={(input) => this.form.item = input} onChange={this.itemChange}>
                {itemOption}
                </select>
                </div>

                <div className="form-group row">
					<div className="col-lg-6">
						<label htmlFor="amount">No. of Items To Give</label>
						<div className="input-group mb-3">
							<div className="input-group-prepend">
								<span className="input-group-text">Amount</span>
							</div>
							<input type="number" min="1" className={"form-control " + warning.amount} id="amount" title={"Amount Needed"} ref={(input) => this.form.amount = input} autoComplete="off" onChange={this.amountChange} />
						</div>
						
					</div>
				</div>

				<div className="form-group row">
					<div className="col-lg-6">
						<label htmlFor="minAmount">Minimum Amount Others Could Take</label>
						<div className="input-group mb-3">
							<div className="input-group-prepend">
								<span className="input-group-text">Min. Amount</span>
							</div>
							<input type="number" min="1" className={"form-control " + warning.minAmount} id="minAmount" title={"Minimum Amount"} ref={(input) => this.form.minAmount = input} autoComplete="off" onChange={this.minAmountChange} />
						</div>
						<small className="form-text text-muted">Should be less than the Amount.</small>
					</div>	
				</div>

                <div className="form-group">
					<p>Item Cover Image</p>
					<div className="custom-file">
						<input type="file" className={"custom-file-input " + warning.image} id="customFile" title="Event Cover Image" onChange={this.handleFile} autoComplete="off" />
						<label className="custom-file-label" htmlFor="customFile">{file_label}</label>
					</div>
					<small className="form-text text-muted">Image format: jpg, png. Max file size 1mb.</small>
				</div>

				<div className="form-group">
					<label htmlFor="address">Location:</label>
					<textarea className={"form-control " + warning.address} id="address" title="address" rows="1" ref={(input) => this.form.address = input} onChange={this.addressChange} autoComplete="off"></textarea>
					<small className="form-text text-muted">{this.state.address_length}/50 characters available.</small>
				</div>

                <div className="form-group">
					<label htmlFor="remarks">Description/Remarks:</label>
					<textarea className={"form-control " + warning.description} id="remarks" title="remarks" rows="5" ref={(input) => this.form.description = input} onChange={this.descriptionChange} autoComplete="off"></textarea>
					<small className="form-text text-muted">{this.state.description_length}/500 characters available.</small>
				</div>

				<div className="form-group">
					<p>Borrow only / Will be returned on or before the end date.</p>
					<div className="custom-control custom-radio custom-control-inline">
						<input type="radio" id="Yes" name="return" className="custom-control-input"  value="true" title="Will be returned" onChange={this.handleReturn} autoComplete="off" />
						<label className="custom-control-label" htmlFor="Yes">Yes</label>
					</div>
					<div className="custom-control custom-radio custom-control-inline">
						<input type="radio" id="No" name="return" className="custom-control-input" value="false"  checked={this.state.return === 'false'} title="Will not be returned" onChange={this.handleReturn} autoComplete="off" />
						<label className="custom-control-label" htmlFor="No">No</label>
					</div>
				</div>

                <div className="form-group">
					<label htmlFor="End">End Date and Time:</label>
					<Datetime closeOnSelect={false} onChange={this.handleEndDate} inputProps={{className : "form-control " + warning.endtime, title: "Open Until"}} autoComplete="off" />
				</div>
			
				<br />
				{alert}
				<br />
				<button type="submit" className="btn btn-outline-dark" title="Lend A Hand" onClick={this.handleForm} disabled={disabled}>Lend A Hand</button>

			</form>
			</div>

			<div className="col col-xl-4 col-lg-4 col-md-12 col-sm-12 create-event">
            <label></label>
			<div className="card">
			
			<div className="image_wrapper">
				<img className="card-img-top event-image" src={this.state.fileImg} alt="Placeholder Event" />
			</div>

			<div className="card-header text-muted event-header">
				<p className="small text-truncate mb-0"></p>
			</div>

			<div className="card-body-form">
                        <h5 className="card-title event-title" title={this.state.title} >
							{this.state.title}
						</h5>
				{this.state.description}
			</div>
			
			<ul className="list-group list-group-flush">
            <li className="list-group-item-page"><strong>Item:</strong> {this.state.item} </li>
            <li className="list-group-item-page"><strong>Minimum Amount To Take: {this.state.minimum} Items</strong>  </li>
            {this.state.return === 'false' &&<li className="list-group-item-page"><strong>Will Close On: {this.state.enddateDisplay.toLocaleDateString()} at {this.state.enddateDisplay.toLocaleTimeString()}</strong></li>}
            {this.state.return === 'true' && <li className="list-group-item-page"><strong>Should Return On or Before: {this.state.enddateDisplay.toLocaleDateString()} at {this.state.enddateDisplay.toLocaleTimeString()}</strong></li>}
            <li className="list-group-item-page"><strong>Items Remaining:</strong> {this.state.amount}/{this.state.amount} </li>
            <li className="list-group-item-page small"><div class="progress"><div class="progress-inner2" style={{"width":percentage }}></div><div class="progress-outer" style={{"width":"100%" }}></div><p className="  mb-0 text-center">{percentage}</p></div></li>

            </ul>

			<div className="card-footer-form text-muted text-center">
				<button className="btnAlive" disabled="">Take</button>
			</div>

</div>
</div>
</React.Fragment>
		);
	}

}

export default LendAHand;
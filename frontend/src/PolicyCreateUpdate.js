
import  React, { Component } from  'react';

import  PoliciesService  from  './PoliciesService';
const  policiesService  =  new  PoliciesService();

class  PolicyCreateUpdate  extends  Component {

	constructor(props) {
		super(props);
	}

}
export default PolicyCreateUpdate;

handleSubmit(event)
{
	const { match: { params } } =  this.props;
	if(params  &&  params.pk){
		this.handleUpdate(params.pk);
	}
	else
	{
		this.handleCreate();
	}
	event.preventDefault();
}

render()
{
        return (
          <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>
              Number:</label>
              <input className="form-control" type="text" ref='number' />

            <label>
              Policy holder:</label>
              <input className="form-control" type="text" ref='policy_holder'/>

            <label>
              Policy owner:</label>
              <input className="form-control" type="text" ref='policy_owner' />

            <label>
              Product:</label>
              <input className="form-control" type="text" ref='product' />

            <label>
              Insurance company:</label>
              <input className="form-control" type="text" ref='insurance_company' />

            <label>
              Type of insurance:</label>
              <textarea className="form-control" ref='type_Of_insurance' ></textarea>

             <label>
              Region:</label>
              <textarea className="form-control" ref='region' ></textarea>

             <label>
              Registration date:</label>
              <textarea className="form-control" ref='registration_date' ></textarea>

            <label>
              Start date:</label>
              <textarea className="form-control" ref='start_date' ></textarea>

            <label>
              End date:</label>
              <textarea className="form-control" ref='end_date' ></textarea>

            <label>
              Insurance sum:</label>
              <textarea className="form-control" ref='insurance_sum' ></textarea>

            <label>
              Insurance premium:</label>
              <textarea className="form-control" ref='insurance_premium' ></textarea>

            <label>
              Description:</label>
              <textarea className="form-control" ref='description' ></textarea>

            <label>
              Created at:</label>
              <textarea className="form-control" ref='createdAt' ></textarea>

            <input className="btn btn-primary" type="submit" value="Submit" />
            </div>
          </form>
        );
  }

class PolicyCreateUpdate extends Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleCreate() {
        policiesService.createPolicy(
            {
                "first_name": this.refs.firstName.value,
                "last_name": this.refs.lastName.value,
                "email": this.refs.email.value,
                "phone": this.refs.phone.value,
                "address": this.refs.address.value,
                "description": this.refs.description.value
            }).then((result) => {
            alert("Customer created!");
        }).catch(() => {
            alert('There was an error! Please re-check your form.');
        });
    }
}

import  React, { Component } from  'react';
import  PoliciesService  from  './PoliciesService';

const  policiesService  =  new  PoliciesService();

class  PoliciesList  extends  Component {

	constructor(props) {
		super(props);
		this.state  = {
			policies: [],
			nextPageURL:  ''
		};
		this.nextPage  =  this.nextPage.bind(this);
		this.handleDelete  =  this.handleDelete.bind(this);
	}
}
export  default  PoliciesList;

componentDidMount()
{
	var  self  =  this;
	policiesService.getPolicies().then(function (result) {
		self.setState({ policies:  result.data, nextPageURL:  result.nextlink})
	});
}

handleDelete(e,pk)
{
	var  self  =  this;
	policiesService.deletePolicy({pk :  pk}).then(()=>{
		var  newArr  =  self.state.policies.filter(function(obj) {
			return  obj.pk  !==  pk;
		});
		self.setState({policies:  newArr})
	});
}

nextPage()
{
	var  self  =  this;
	policiesService.getPoliciesByURL(this.state.nextPageURL).then((result) => {
		self.setState({ policies:  result.data, nextPageURL:  result.nextlink})
	});
}

render()
{

  /*# List of attributes for the InsurancePolicy Class
    # number, policy_holder, policy_owner, product, insurance_company,
    # type_Of_insurance, region, registration_date, start_date
    # start_date, end_date, insurance_sum, insurance_premium
    # description, createdAt */

	return (
	<div  className="policies--list">
		<table  className="table">
			<thead  key="thead">
			<tr>
				<th>#</th>
				<th>Number</th>
				<th>Policy holder</th>
				<th>Policy owner</th>
				<th>Product</th>
				<th>Insurance company</th>
				<th>Type of insurance</th>
				<th>Region</th>
				<th>Registration date</th>
				<th>Start date</th>
				<th>End date</th>
				<th>Insurance sum</th>
				<th>Insurance premium</th>
				<th>Description</th>
				<th>Created at</th>
			</tr>
			</thead>
			<tbody>

	/*# List of attributes for the InsurancePolicy Class
    # number, policy_holder, policy_owner, product, insurance_company,
    # type_Of_insurance, region, registration_date, start_date
    # start_date, end_date, insurance_sum, insurance_premium
    # description, createdAt */

				{this.state.policies.map( c  =>
				<tr  key={c.pk}>
					<td>{c.pk}  </td>
					<td>{c.number}</td>
					<td>{c.policy_holder}</td>
					<td>{c.policy_owner}</td>
					<td>{c.product}</td>
					<td>{c.type_Of_insurance}</td>
					<td>{c.region}</td>
					<td>{c.registration_date}</td>
					<td>{c.start_date}</td>
					<td>{c.end_date}</td>
					<td>{c.insurance_sum}</td>
					<td>{c.insurance_premium}</td>
					<td>{c.description}</td>
					<td>{c.createdAt}</td>
					<td>
					<button  onClick={(e)=>  this.handleDelete(e,c.pk) }> Delete</button>
					<a  href={"/policies/" + c.pk}> Update</a>
					</td>
				</tr>)}
			</tbody>
		</table>
		<button  className="btn btn-primary"  onClick=  {  this.nextPage  }>Next</button>
	</div>
	);
}

import  React, { Component } from  'react';
import  ClientsService  from  './ClientsService';

const  clientsService  =  new  ClientsService();

class  ClientsList  extends  Component {

	constructor(props) {
		super(props);
		this.state  = {
			clients: [],
			nextPageURL:  ''
		};
		this.nextPage  =  this.nextPage.bind(this);
		this.handleDelete  =  this.handleDelete.bind(this);
	}

	componentDidMount() {
		var self = this;
		clientsService.getClients().then(function (result) {
			self.setState({clients: result.data, nextPageURL: result.nextlink})
		});
	}

	handleDelete(e,pk) {
		var self = this;
		clientsService.deleteClient({pk: pk}).then(() => {
			var newArr = self.state.clients.filter(function (obj) {
				return obj.pk !== pk;
			});
			self.setState({clients: newArr})
		});
	}

	nextPage() {
		var self = this;
		clientsService.getClientsByURL(this.state.nextPageURL).then((result) => {
			self.setState({clients: result.data, nextPageURL: result.nextlink})
		});
	}

	render()
	{

		/*List of attributes for the Client Class
          fields: id, name, first_name, middle_name, last_name, email, phone, address */

		return (
			<div className="policies--list">
				<table className="table">
					<thead key="thead">
					<tr>
						<th>#</th>
						<th>id</th>
						<th>Name</th>
						<th>First Name</th>
						<th>Middle Name</th>
						<th>Last Name</th>
						<th>phone</th>
						<th>address</th>

					</tr>
					</thead>
					<tbody>

					/*List of attributes for the Client Class
					fields: id, name, first_name, middle_name, last_name, email, phone, address */

					{this.state.clients.map(c =>
						<tr key={c.pk}>
							<td>{c.pk}  </td>
							<td>{c.name}</td>
							<td>{c.first_name}</td>
							<td>{c.middle_name}</td>
							<td>{c.last_name}</td>
							<td>{c.email}</td>
							<td>{c.phone}</td>
							<td>{c.address}</td>
							<td>
								<button onClick={(e) => this.handleDelete(e, c.pk)}> Delete</button>
								<a href={"/clients/" + c.pk}> Update</a>
							</td>
						</tr>)}
					</tbody>
				</table>
				<button className="btn btn-primary" onClick={this.nextPage}>Next</button>
			</div>
		);
	}

}
	export default ClientsList;
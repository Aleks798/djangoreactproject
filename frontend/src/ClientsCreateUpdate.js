
import  React, { Component } from  'react';
import { useParams } from 'react-router-dom';

import ClientsService from "./ClientsService";
const  clientsService  =  new  ClientsService();

const withRouter = WrappedComponent => props => {
    const params = useParams();
    // etc... other react-router-dom v6 hooks

    return (
        <WrappedComponent
            {...props}
            params={params}
            // etc...
        />
    );
};

class  ClientCreateUpdate  extends  Component {

    constructor(props) {
        super(props);
        //console.log('class  ClientCreateUpdate()');
        //console.log(props);

        this.state = {
            id: 0,
            name: '',
            first_name: '',
            middle_name: '',
            last_name: '',
            email: '',
            phone: '',
            address: '',

        }

        this.handleInputChange = this.handleInputChange.bind(this);

    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        console.log('handleInputChange(event): name: ' + name);
        console.log('handleInputChange(event): value: ' + value);

        this.setState({
            [name]: value
        });
    }

    componentDidMount(){
        const params = this.props.params;

        //console.log('componentDidMount():');
        //console.log(this.props);
       //const params = useParams();
       // const { match: { params } } = this.props;
        //const params = this.props.match.params;
        if(params && params.pk)
        {
            clientsService.getClient(params.pk).then((c)=>{

                this.setState( {
                    id: c.id,
                    name: c.first_name,
                    first_name: c.first_name,
                    middle_name: c.middle_name,
                    last_name: c.last_name,
                    email: c.email,
                    phone:  c.phone,
                    address: c.address,

                });
            })
        }
    }

    handleCreate() {
        console.log('handleCreate method start');
        clientsService.createClient(
            {
                "id": this.state.id,
                "first_name": this.state.first_name,
                "middle_name": this.state.middle_name,
                "last_name": this.state.last_name,
                "email": this.state.email,
                "phone": this.state.phone,
                "address": this.state.address
            }).then((result) => {
            alert("Client created!");
        }).catch(() => {
            alert('There was an error! Please re-check your form.');
        });
    }

    handleUpdate(pk){
        console.log('handleUpdate('+pk+')');
        clientsService.updateClient(
            {
                "pk": pk,
                "id": this.state.id,
                "first_name": this.state.first_name,
                "middle_name": this.state.middle_name,
                "last_name": this.state.last_name,
                "email": this.state.email,
                "phone": this.state.phone,
                "address": this.state.address

            }
        ).then((result)=>{
            console.log(result);
            alert("Client updated!");
        }).catch(()=>{
            alert('There was an error! Please re-check your form.');
        });
    }

    handleSubmit(event) {
        const { match: { params } } =  this.props;

        console.log('handleSubmit(event)');
        console.log(params);

        if(params  &&  params.pk){
            this.handleUpdate(params.pk);
            console.log('handleSubmit(event): this.handleUpdate(params.pk);');
        }
        else
        {
            this.handleCreate();
            console.log('handleSubmit(event): this.handleCreate();');
        }
        event.preventDefault();
    }

/*List of attributes for the Client Class
  fields: id, name, first_name, middle_name, last_name, email, phone, address */

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <h3>
                        Client: {this.state.name}
                    </h3>
                    <label>
                        Id:</label>
                    <input name="id" className="form-control" type="text" value={this.state.id}  onChange={this.handleInputChange} />

                    <label>
                        Name:</label>
                    <input name="name" className="form-control" type="text" value={this.state.name} onChange={this.handleInputChange} />

                    <label>
                        First name:</label>
                    <input name="first_name" className="form-control" type="text" value={this.state.first_name} onChange={this.handleInputChange} />

                    <label>
                        Middle name:</label>
                    <input name="middle_name" className="form-control" type="text" value={this.state.middle_name} onChange={this.handleInputChange} />

                    <label>
                        Last name:</label>
                    <input name="last_name" className="form-control" type="text" value={this.state.last_name} onChange={this.handleInputChange} />

                    <label>
                        e-mail:</label>
                    <input name="email" className="form-control" type="text" value={this.state.email} onChange={this.handleInputChange} />

                    <label>
                        Phone:</label>
                    <input name="phone" className="form-control" type="text" value={this.state.phone} onChange={this.handleInputChange} />

                    <label>
                        Address:</label>
                    <textarea name="address" className="form-control" value={this.state.address} onChange={this.handleInputChange} />

                    <button name="btn btn-primary" onClick={this.handleSubmit} />
                    {/*<input className="btn btn-primary" value="Submit" onCilck={this.handleSubmit} />*/}
                </div>
            </form>
        );
    }
}
export default withRouter(ClientCreateUpdate);


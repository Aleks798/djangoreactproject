
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
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        const params = this.props.params
       //const params = useParams();
       // const { match: { params } } = this.props;
        //const params = this.props.match.params;
        if(params && params.pk)
        {
            clientsService.getClient(params.pk).then((c)=>{
                this.refs.firstName.value = c.first_name;
                this.refs.lastName.value = c.last_name;
                this.refs.email.value = c.email;
                this.refs.phone.value = c.phone;
                this.refs.address.value = c.address;
            })
        }
    }

    handleCreate() {
        clientsService.createClient(
            {
                "first_name": this.refs.firstName.value,
                "last_name": this.refs.lastName.value,
                "email": this.refs.email.value,
                "phone": this.refs.phone.value,
                "address": this.refs.address.value
            }).then((result) => {
            alert("Client created!");
        }).catch(() => {
            alert('There was an error! Please re-check your form.');
        });
    }

    handleUpdate(pk){
        clientsService.updateClient(
            {
                "pk": pk,
                "first_name": this.refs.firstName.value,
                "last_name": this.refs.lastName.value,
                "email": this.refs.email.value,
                "phone": this.refs.phone.value,
                "address": this.refs.address.value

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
        if(params  &&  params.pk){
            this.handleUpdate(params.pk);
        }
        else
        {
            this.handleCreate();
        }
        event.preventDefault();
    }

/*List of attributes for the Client Class
  fields: id, name, first_name, middle_name, last_name, email, phone, address */

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label>
                        Name:</label>
                    <input className="form-control" type="text" ref='name'/>

                    <label>
                        First name:</label>
                    <input className="form-control" type="text" ref='first_name'/>

                    <label>
                        Middle name:</label>
                    <input className="form-control" type="text" ref='middle_name'/>

                    <label>
                        e-mail:</label>
                    <input className="form-control" type="text" ref='email'/>

                    <label>
                        Phone:</label>
                    <input className="form-control" type="text" ref='phone'/>

                    <label>
                        Address:</label>
                    <textarea className="form-control" ref='address'></textarea>


                    <input className="btn btn-primary" type="submit" value="Submit"/>
                </div>
            </form>
        );
    }
}
export default withRouter(ClientCreateUpdate);


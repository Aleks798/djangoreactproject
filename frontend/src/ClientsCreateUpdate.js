
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
        this.id= React.createRef();
        this.name= React.createRef();
        this.first_name= React.createRef();
        this.middle_name= React.createRef();
        this.last_name= React.createRef();
        this.email= React.createRef();
        this.phone= React.createRef();
        this.address= React.createRef();
    }

    componentDidMount(){
        const params = this.props.params
       //const params = useParams();
       // const { match: { params } } = this.props;
        //const params = this.props.match.params;
        if(params && params.pk)
        {
            clientsService.getClient(params.pk).then((c)=>{
                this.name.value = c.name;
                this.first_name.value = c.first_name;
                this.middle_name.value = c.middle_name;
                this.last_name.value = c.last_name;
                this.email.value = c.email;
                this.phone.value = c.phone;
                this.address.value = c.address;
            })
        }
    }

    handleCreate() {
        console.log('handleCreate method start');
        clientsService.createClient(
            {
                //"id": this.firstName.id,
                "first_name": this.first_name.value,
                "middle_name": this.middle_name.value,
                "last_name": this.last_name.value,
                "email": this.email.value,
                "phone": this.phone.value,
                "address": this.address.value
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
                "id": this.id.value,
                "first_name": this.first_name.value,
                "middle_name": this.middle_name.value,
                "last_name": this.last_name.value,
                "email": this.email.value,
                "phone": this.phone.value,
                "address": this.address.value

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
                        Id:</label>
                    <input className="form-control" type="text" ref={this.id}/>

                    <label>
                        Name:</label>
                    <input className="form-control" type="text" ref={this.name}/>

                    <label>
                        First name:</label>
                    <input className="form-control" type="text" ref={this.first_name}/>

                    <label>
                        Middle name:</label>
                    <input className="form-control" type="text" ref={this.middle_name}/>

                    <label>
                        Last name:</label>
                    <input className="form-control" type="text" ref={this.last_name}/>

                    <label>
                        e-mail:</label>
                    <input className="form-control" type="text" ref={this.email}/>

                    <label>
                        Phone:</label>
                    <input className="form-control" type="text" ref={this.phone}/>

                    <label>
                        Address:</label>
                    <textarea className="form-control" ref={this.address}></textarea>


                    <input className="btn btn-primary" type="submit" value="Submit"/>
                </div>
            </form>
        );
    }
}
export default withRouter(ClientCreateUpdate);


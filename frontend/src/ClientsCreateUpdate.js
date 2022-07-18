
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
        console.log('class  ClientCreateUpdate()');
        console.log(props);

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
        const params = this.props.params;

        console.log('componentDidMount():');
        console.log(this.props);
       //const params = useParams();
       // const { match: { params } } = this.props;
        //const params = this.props.match.params;
        if(params && params.pk)
        {
            clientsService.getClient(params.pk).then((c)=>{
                console.log('componentDidMount(): clientsService.getClient():');
                console.log(params);
                this.id.current = c.id;
                this.name.current = c.name;
                this.first_name.current = c.first_name;
                this.middle_name.current = c.middle_name;
                this.last_name.current = c.last_name;
                this.email.current = c.email;
                this.phone.current = c.phone;
                this.address.current = c.address;
            })
        }
    }

    handleCreate() {
        console.log('handleCreate method start');
        clientsService.createClient(
            {
                "id": this.id.value,
                "first_name": this.first_name.current,
                "middle_name": this.middle_name.current,
                "last_name": this.last_name.current,
                "email": this.email.current,
                "phone": this.phone.current,
                "address": this.address.current
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
                "id": this.id.current,
                "first_name": this.first_name.current,
                "middle_name": this.middle_name.current,
                "last_name": this.last_name.current,
                "email": this.email.current,
                "phone": this.phone.current,
                "address": this.address.current

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

        console.log(params);

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
                    <input className="form-control" type="text" ref={this.id}  >{this.id.current}</input>

                    <label>
                        Name:</label>
                    <input className="form-control" type="text" ref={this.name} >{this.name.current}</input>

                    <label>
                        First name:</label>
                    <input className="form-control" type="text" ref={this.first_name} >{this.first_name.current}</input>

                    <label>
                        Middle name:</label>
                    <input className="form-control" type="text" ref={this.middle_name} >{this.middle_name.current}</input>

                    <label>
                        Last name:</label>
                    <input className="form-control" type="text" ref={this.last_name} >{this.last_name.current}</input>

                    <label>
                        e-mail:</label>
                    <input className="form-control" type="text" ref={this.email} >{this.email.current}</input>

                    <label>
                        Phone:</label>
                    <input className="form-control" type="text" ref={this.phone} >{this.phone.current}</input>

                    <label>
                        Address:</label>
                    <textarea className="form-control" ref={this.address} >{this.address.current}</textarea>


                    <input className="btn btn-primary" type="submit" value="Submit"/>
                </div>
            </form>
        );
    }
}
export default withRouter(ClientCreateUpdate);


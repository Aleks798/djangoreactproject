
import  React, { Component } from  'react';
import { useParams } from 'react-router-dom';
import RefService from "./RefService";
import ProductDialog from "./components/productedit";

const  refService  =  new  RefService();

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

class  RefCreateUpdate  extends  Component {

    constructor(props) {
        super(props);
        //console.log('class  ClientCreateUpdate()');
        //console.log(props);

        this.state = { };
        this.refUrl = this.props.refUrl;

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleFormSubmit(event){
        event.preventDefault();
        //console.log(' handleFormSubmit(event)');
    };

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        //console.log('handleInputChange(event): name: ' + name);
        //console.log('handleInputChange(event): value: ' + value);

        this.setState({
            [name]: value
        });
    }

    componentDidMount(){
        const params = this.props.params;

        if(params && params.pk)
        {
            refService.getRef(params.pk).then((c)=>{

                this.setState( {
                    ...c

                });
            })
        }
    }

    handleCreate() {
        refService.createRef(
            {
                ...this.state
            }).then((result) => {
            console.log("element created!");
        }).catch(() => {
            alert('There was an error! Please re-check your form.');
        });
    }

    handleUpdate(pk){
        console.log('handleUpdate('+pk+')');
        refService.updateClient(
            {
                "pk": this.state.id,
                ...this.state
            }
        ).then((result)=>{
            console.log(result);
            alert("element updated!");
        }).catch(()=>{
            alert('There was an error! Please re-check your form.');
        });
    }

    handleSubmit(event) {
        console.log('handleSubmit()');
        console.log('handleSubmit(event)');
        console.log(this.state);

       if(this.state.id !== 0){
           this.handleUpdate(this.state.id);
           console.log('v.2 handleSubmit(event): this.handleUpdate(params.pk);');
       }
        else
        {
            this.handleCreate();
            console.log('handleSubmit(event): this.handleCreate();');
        }
     }




    render() {
        return (
            <>
            {(this.refUrl==='products') ? <ProductDialog  /> : <></>}
            </>
        );
    }

}
export default withRouter(RefCreateUpdate);


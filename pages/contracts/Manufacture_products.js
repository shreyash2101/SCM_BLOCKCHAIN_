import React, { Component } from 'react';
import productManagement from '../../ProductManagement';
import changeOwnership from '../../ChangeOwnership';
import Layout from '../../components/layout';
import {Form , Button, Message, } from 'semantic-ui-react';
import web3 from '../../web3';

class contractNew extends Component {
    state ={
        serial_number : '',
        product_name : '',
        part_number1:'',
        part_number2:'',
        part_number3:'',
        part_number4:'',
        part_number5:'',
        errorMessage:'',
        loading:false,
        success:false,
        manufacturer:'',
        addLoading:false,
        addErrorMessage:''
    };
    onSubmit = async (event) => {

        event.preventDefault();
        this.setState({loading:true, errorMessage: '', success:false ,addErrorMessage:''});
        var product;
        try{
            if(!(this.state.serial_number)){
                console.log('inside if');
                throw new Error('PROVIDE A SERIAL NUMBER NULL VALUE NOT ALLOWED');
                
            }
            if(!(this.state.product_name)){
                console.log('inside if');
                throw new Error('PROVIDE A PRODUCT NAME NULL VALUE NOT ALLOWED');
                
            }
            if(!(this.state.part_number1)){
                console.log('inside if');
                throw new Error('PROVIDE PART NUMBER 1 NULL VALUE NOT ALLOWED');
                
            }
            if(!(this.state.part_number2)){
                console.log('inside if');
                throw new Error('PROVIDE A PART NUMBER 2 NULL VALUE NOT ALLOWED');
                
            }
            if(!(this.state.part_number3)){
                console.log('inside if');
                throw new Error('PROVIDE A PART NUMBER 3 NULL VALUE NOT ALLOWED');
                
            }
            if(!(this.state.part_number4)){
                console.log('inside if');
                throw new Error('PROVIDE A PART NUMBER 4 NULL VALUE NOT ALLOWED');
                
            }
            if(!(this.state.part_number5)){
                console.log('inside if');
                throw new Error('PROVIDE A PART NUMBER 5 NULL VALUE NOT ALLOWED');
                
            }
             
             console.log("inside try block");
            const accounts = await web3.eth.getAccounts();
            this.setState({manufacturer: accounts[0]});
            product = await productManagement.methods.buildProduct(this.state.serial_number, this.state.product_name,this.state.part_number1,this.state.part_number2
                ,this.state.part_number3,this.state.part_number4,this.state.part_number5)
            .send({ from: accounts[0] });
        }catch(err){
            this.setState({loading:false});
            console.log("inside catch block");
            console.log(err);
            this.setState({errorMessage: err.message});
        }
        if (product !== undefined) {
            this.setState({ success: true });
        }
        this.setState({loading:false});
    }
    addOwnership = async () => {
        this.setState({addLoading:true});
        try{
            console.log(" add ownership inside try");
            const accounts = await web3.eth.getAccounts();
            await changeOwnership.methods.addOwnership(1,this.state.serial_number)
                .send({from :accounts[0]});
                this.setState({addErrorMessage:'Ownership added Successfully'});
        }
        catch(err){
            console.log("add ownership inside catch");
            console.log(err);
            this.setState({addLoading:false});
            this.setState({addErrorMessage: "opps something went Wrong please try again"});
        }
        
        this.setState({addLoading:false});
    }
    render(){
        return( 
        <Layout>
        <h1>Build Products </h1>
    
        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                <Form.Group unstackable widths={1} >
                    <Form.Input label = 'product serial number' style={{widths:'100%'}}
                     value = {this.state.serial_number}
                     onChange = {event => this.setState({serial_number:event.target.value })}/>
                </Form.Group>
                <Form.Group unstackable widths={1} >
                    <Form.Input label = 'product name' style={{widths:'100%'}}
                     value = {this.state.product_name}
                     onChange = {event => this.setState({product_name:event.target.value })}/>
                </Form.Group>
                <Message style={{widths:'100%'}}
                    compact
                    content='Provide the serial number of the parts used to build this product'
                />
                <Form.Group unstackable widths={2}>
                        <Form.Input label='serial number of part 1' placeholder='serial number'
                        value = {this.state.part_number1}
                        onChange = {event => this.setState({part_number1:event.target.value })} />
                        <Form.Input label='serial number of part 2' placeholder='serial number'
                        value = {this.state.part_number2}
                        onChange = {event => this.setState({part_number2:event.target.value })} />
                </Form.Group>
                <Form.Group widths={2}>
                <Form.Input label='serial number of part 3' placeholder='serial number'
                        value = {this.state.part_number3}
                        onChange = {event => this.setState({part_number3:event.target.value })} />
                         <Form.Input label='serial number of part 4' placeholder='serial number'
                        value = {this.state.part_number4}
                        onChange = {event => this.setState({part_number4:event.target.value })} />
                </Form.Group>
                <Form.Group unstackable widths={2}>
                        <Form.Input label='serial number of part 5' placeholder='serial number' 
                         value = {this.state.part_number5}
                         onChange = {event => this.setState({part_number5:event.target.value })} />
                        <Button loading={ this.state.loading } primary  style={{height:"50px",marginLeft:"25%"}}>Build Product</Button>
                </Form.Group>
                <Message
                            error
                            header='Opps!!!!'
                            content={this.state.errorMessage}
                            />
                
            </Form>
            {this.state.success &&
                    <div>
                        <Message positive>
                            <Message.Header>Product build Successfully</Message.Header>
                            <p>
                            .Product registered by : {this.state.manufacturer}  <br/>
                             Add ownership of the product by clicking on the button below
                            </p>
                        </Message>
                        <Button primary onClick={this.addOwnership}>Add Ownership</Button>
                        { (!!this.state.addErrorMessage) && 
                       <Message positive> <Message.Header>{this.state.addErrorMessage}</Message.Header></Message>
                       }
                    </div>
                }
                {this.state.errorMessage &&
                    <div>
                         <Message>
                            <Message.Header>Make sure of the following :</Message.Header>
                            <Message.List>
                            <Message.Item>you confirmed the transcation on metamask</Message.Item>
                            <Message.Item>the serial number of the product is not duplicate</Message.Item>
                            <Message.Item>the parts used to make this product is not taken by another product</Message.Item>
                            <Message.Item>You are registered to build product by the contract</Message.Item>
                            </Message.List>
                        </Message>
                    </div>
                }
        </Layout>
        )
    }
}
export default contractNew;

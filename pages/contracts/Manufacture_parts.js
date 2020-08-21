import React, { Component } from 'react';
import productManagement from '../../ProductManagement'
import Layout from '../../components/layout';
import {Form , Button, Message, Icon } from 'semantic-ui-react';
import changeOwnership from '../../ChangeOwnership';
import web3 from '../../web3';

class contractNew extends Component {
    state ={
        serial_number : '',
        part_name : '',
        errorMessage: '',
        loading: false,
        success:false,
        manufacturer:'',
        addErrorMessage:'',
        addLoading:false
    };
    onSubmit = async (event) => {

        event.preventDefault();
        this.setState({loading:true, errorMessage: '' , success:false, addErrorMessage: ''});
        var part = undefined;
        try{
            if(!(this.state.serial_number)){
                console.log('inside if');
                throw new Error('PROVIDE A SERIAL NUMBER NULL VALUE NOT ALLOWED');
                
            }
            if(!(this.state.part_name)){
                console.log('inside if');
                throw new Error('PROVIDE A PART NULL VALUE NOT ALLOWED');
                
            }
             
            const accounts = await web3.eth.getAccounts();
            this.setState({manufacturer: accounts[0]});
             part = await productManagement.methods.buildPart(this.state.serial_number, this.state.part_name)
            .send({ from: accounts[0] });
        }catch(err){
            this.setState({errorMessage: err.message});
        }
        if (part !== undefined) {
            this.setState({ success: true });
        }
        this.setState({loading:false});
    }
    addOwnership = async () => {
        this.setState({addLoading:true});
        try{
            const accounts = await web3.eth.getAccounts();
            await changeOwnership.methods.addOwnership(0,this.state.serial_number)
                .send({from :accounts[0]});
                this.setState({addErrorMessage:'Ownership added Successfully'});
            
        }
        catch(err){
            this.setState({addLoading:false});
            this.setState({addErrorMessage: "opps something went Wrong please try again"});
        }
        
        this.setState({addLoading:false});
             
                
    }
    render(){
        return( 
        <Layout>
        <h1>Build Part </h1>
            <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                <Form.Field>
                    <label>serial Number  </label>
                        <input
                        value = {this.state.serial_number}
                        onChange = {event => this.setState({serial_number:event.target.value }) }
                        />
                    <label>Part Name  </label>
                        <input
                         value = {this.state.part_name}
                         onChange = {event => this.setState({part_name:event.target.value }) }
                         />
                         <Message
                            error
                            header='Opps!!!!'
                            content={this.state.errorMessage}
                            />
                   
                </Form.Field>
                <Button loading={ this.state.loading } primary >Build part</Button>
            </Form> 
            {this.state.success &&
                    <div>
                        <Message positive>
                            <Message.Header>Part build Successfully</Message.Header>
                            <p>
                            .Part registered by : {this.state.manufacturer}  <br/>
                             Add ownership of the product by clicking on the button below
                            </p>
                        </Message>
                        <Button loading={ this.state.addLoading } primary onClick={this.addOwnership} >Add Ownership</Button>
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
                            <Message.Item>the serial number is not duplicate</Message.Item>
                            <Message.Item>You are registered to build parts by the contract</Message.Item>
                            </Message.List>
                        </Message>
                    </div>
                }

        </Layout>
        );
    }


}

export default contractNew;

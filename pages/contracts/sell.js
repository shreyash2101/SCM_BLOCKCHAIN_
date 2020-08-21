import React, { Component } from 'react';
import web3 from '../../web3';
import { Form, Button ,Message } from 'semantic-ui-react';
import changeOwnership from '../../ChangeOwnership';
import Layout from '../../components/layout';
class Contracts extends Component {
    state ={
        serial_number : '',
        to:'',
        type:'',
        errorMessage:'',
        success: false
    };
    handleChange = async (event) => {
        this.setState({type: event.target.value})
        
    }   
    onSubmit = async (event) => {

        event.preventDefault();
        this.setState({loading:true, errorMessage: '' , success:false});
        var ownership = undefined;
        try{
            if(!(this.state.serial_number)){
                throw new Error('PROVIDE A SERIAL NUMBER NULL VALUE NOT ALLOWED');
            }
            if(!(this.state.to)){
                throw new Error('PROVIDE A BUYER ACCOUNT NUMBER VALUE NOT ALLOWED');
                
            }
             
            const accounts = await web3.eth.getAccounts();
            this.setState({manufacturer: accounts[0]});
             ownership = await changeOwnership.methods.changeOwnership(this.state.type,this.state.serial_number,this.state.to)
            .send({ from: accounts[0] });
        }catch(err){
            this.setState({errorMessage: err.message});
        }
        if (ownership !== undefined) {
            this.setState({ success: true });
        }
        this.setState({loading:false});
    }
    render() {
        return (
        <Layout>
            <div style = {{marginTop:"50px"}}>
            <select class='ui dropdown' value={this.state.type} onChange={this.handleChange}>
                <option value=''>select one</option>
                <option value='0'>part</option>
                <option value='1'>Product</option>
            </select>
            <div class = "ui action input" style={{width:"90%"}}>
                <input type="text" placeholder="serial no....." 
                        value = {this.state.serial_number}
                        onChange = {event => this.setState({serial_number:event.target.value })}/>
            </div>
            </div>
            <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                <Form.Field>
                    <label>Transfer ownership to :  </label>
                        <input
                        value = {this.state.to}
                        onChange = {event => this.setState({to:event.target.value }) }
                        />
                         <Message
                            error
                            header='Opps!!!!'
                            content={this.state.errorMessage}
                            />
                   
                </Form.Field>
                <Button loading={ this.state.loading } primary icon = "Add">ChangeOwnership</Button>
            </Form> 
            {this.state.success &&
                    <div>
                        <Message positive>
                            <Message.Header>Ownership changed Successfully </Message.Header>
                            <p>
                            .ownership changed to  : {this.state.to}  <br/>
                            </p>
                        </Message>
                    </div>
                }
                {this.state.errorMessage &&
                <Message>
                    <Message.Header>Make sure of the following :</Message.Header>
                    <Message.List>
                    <Message.Item>you confirmed the transcation on metamask</Message.Item>
                    <Message.Item>you hold the ownership of the product or part</Message.Item>
                    </Message.List>
                </Message>
                }
         </Layout>
         );
        
    }

}
export default Contracts;   

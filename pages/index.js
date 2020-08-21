import React, { Component } from "react";
import productManagement from "../ProductManagement";
import web3 from "../web3";
import { Form, Button, Card, Message, List } from "semantic-ui-react";
import changeOwnership from "../ChangeOwnership";
import Layout from "../components/layout";
class Contracts extends Component {
  state = {
    partDetails: {},
    allParts: [],
    serial_number: "",
    type: "",
    errorMessage: "",
    owners: [],
    success: false,
    OwnerSuccess: false,
    part: false,
    product: false,
    productDetails: {},
  };
  handleChange = async (event) => {
    this.setState({ type: event.target.value });
  };
  fetchDetails = async (event) => {
    console.log("inside fetch detaails");
    var partDetails;
    var productDetails;
    var partList;
    this.setState({ success: false, owners: [] });
    //this.setState({success:false});
    try {
      if (!this.state.serial_number) {
        console.log("insode if");
        throw new Error("SERIAL NUMBER CANNOT BE EMPTY!!!!!!! ");
      }
      if (!this.state.type) {
        console.log("insode if");
        throw new Error(
          "YOU NEED TO SELECT THAT ITS A PART OR PRODUCT!!!!!!! "
        );
      }
      const accounts = await web3.eth.getAccounts();
      if (this.state.type == "0") {
        console.log("part");
        this.setState({ part: true });
        this.setState({ product: false });
        partDetails = await productManagement.methods
          .showPart(this.state.serial_number)
          .call({ from: accounts[0] });
        this.setState({ partDetails });
        this.setState({ success: true });
        console.log(partDetails);
        if (this.state.partDetails[3] == "0") {
          this.setState({ success: false });
          throw new Error("PART DOESN'T EXISTS");
        }
      }
      if (this.state.type == "1") {
        console.log("product");
        this.setState({ product: true });
        this.setState({ part: false });
        productDetails = await productManagement.methods
          .showProduct(this.state.serial_number)
          .call({ from: accounts[0] });
        this.setState({ productDetails });
        if (this.state.productDetails[3] == "0") {
          this.setState({ success: false });
          throw new Error("PRODUCT DOESN'T EXISTS");
        }
        const partList = await productManagement.methods
          .getParts(this.state.serial_number)
          .call({ from: accounts[0] });
        const partDetails = await productManagement.methods
          .showPart(partList[0])
          .call({ from: accounts[0] });
        const partDetails1 = await productManagement.methods
          .showPart(partList[1])
          .call({ from: accounts[0] });
        const partDetails2 = await productManagement.methods
          .showPart(partList[2])
          .call({ from: accounts[0] });
        const partDetails3 = await productManagement.methods
          .showPart(partList[3])
          .call({ from: accounts[0] });
        const partDetails4 = await productManagement.methods
          .showPart(partList[4])
          .call({ from: accounts[0] });
        const allParts = [
          partDetails,
          partDetails1,
          partDetails2,
          partDetails3,
          partDetails4,
        ];
        this.setState({ allParts });
        console.log("all parts ", this.state.allParts);
        this.setState({ success: true });
      }
    } catch (err) {
      console.log(err.message);
      this.setState({ errorMessage: err.message, success: false });
    }
  };
  traceBack = async () => {
    var owners;
    try {
      const accounts = await web3.eth.getAccounts();
      owners = await changeOwnership.methods
        .getPartHistory(this.state.serial_number)
        .call({ from: accounts[0] });
      console.log("Owners" + owners);
      this.setState({ owners });
      this.setState({ OwnerSuccess: true });
    } catch (err) {
      console.log(err);
    }
  };
  ProductTraceBack = async () => {
    var owners;
    try {
      const accounts = await web3.eth.getAccounts();
      owners = await changeOwnership.methods
        .getProductHistory(this.state.serial_number)
        .call({ from: accounts[0] });
      console.log("Owners" + owners);
      this.setState({ owners });
      this.setState({ OwnerSuccess: true });
    } catch (err) {
      console.log(err);
    }
  };

  renderParts() {
    const nameMapping = {
      "0xfDb356092A17339bcD5eEb0B478442dCD52EDE4c": "Part Manufacturer 1",
      "0xDf0D548D0Fc7268E2FC62C5380787b3ccDcdE6A3": "Part Manufacturer 2",
      "0x4780BA232A1a1CcdfEDf764001C97E93CC55F973": "Logistics",
      "0x3005aF5b8feF1e8194f57dF17fa0d1Be43dfe2F4": "Product Manufacturer",
      "0xB7B2DB2402D37d1A9949c614e4DDdd0F727aBd87": "Retailer",
    };
    const t = parseInt(this.state.partDetails[3], 10);
    var d = new Date(t * 1000);
    const datetime =
      "Date  " +
      d.getDate() +
      "/" +
      (d.getMonth() + 1) +
      "/" +
      d.getFullYear() +
      "  time :" +
      d.getHours() +
      ":" +
      d.getMinutes() +
      ":" +
      d.getSeconds();
    var i = 1;
    return (
      <Card style={{ marginLeft: "30%" }}>
        <Card.Content>
          <Card.Header>{this.state.partDetails[2]}</Card.Header>
          <Card.Meta>
            <strong>serial number :</strong> {this.state.partDetails[1]}{" "}
          </Card.Meta>
          <Card.Description>
            <strong>Manufacturer :</strong>{" "}
            {nameMapping[this.state.partDetails[0]]} <br />
            <strong>time of production :</strong> {datetime} <br />
            <strong>part used in making a car :</strong>{" "}
            {this.state.partDetails[4] ? <span>YES</span> : <span>NO</span>}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Button basic color="green" onClick={this.traceBack}>
            TrackBack
          </Button>
        </Card.Content>
        <Card.Content extra>
          {this.state.OwnerSuccess && (
            <List celled>
              {this.state.owners.map((data) => (
                <List.Item>
                  <List.Content>
                    <List.Header>{nameMapping[data]}</List.Header>
                    <strong> Account address :</strong> {data}
                  </List.Content>
                </List.Item>
              ))}
            </List>
          )}
        </Card.Content>
      </Card>
    );
  }
  renderProduct() {
    const nameMapping = {
      "0xfDb356092A17339bcD5eEb0B478442dCD52EDE4c": "Part Manufacturer 1",
      "0xDf0D548D0Fc7268E2FC62C5380787b3ccDcdE6A3": "Part Manufacturer 2",
      "0x4780BA232A1a1CcdfEDf764001C97E93CC55F973": "Logistics",
      "0x3005aF5b8feF1e8194f57dF17fa0d1Be43dfe2F4": "Product Manufacturer",
      "0xB7B2DB2402D37d1A9949c614e4DDdd0F727aBd87": "Retailer",
    };
    const t = parseInt(this.state.productDetails[3], 10);
    var d = new Date(t * 1000);
    const datetime =
      "Date  " +
      d.getDate() +
      "/" +
      (d.getMonth() + 1) +
      "/" +
      d.getFullYear() +
      "  time :" +
      d.getHours() +
      ":" +
      d.getMinutes() +
      ":" +
      d.getSeconds();
    console.log("inside render product");
    return (
      <div>
        <Card style={{ marginLeft: "30%" }}>
          <Card.Content>
            <Card.Header>{this.state.productDetails[2]}</Card.Header>
            <Card.Meta>
              <strong>serial number :</strong> {this.state.productDetails[1]}{" "}
            </Card.Meta>
            <Card.Description>
              <strong>Manufacturer :</strong>{" "}
              {nameMapping[this.state.productDetails[0]]} <br />
              <strong>time of production :</strong> {datetime} <br />
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <Button basic color="green" onClick={this.ProductTraceBack}>
              TrackBack
            </Button>
          </Card.Content>
          <Card.Content extra>
            {this.state.OwnerSuccess && (
              <List celled>
                {this.state.owners.map((data) => (
                  <List.Item>
                    <List.Content>
                      <List.Header>{nameMapping[data]}</List.Header>
                      <strong> Account address :</strong> {data}
                    </List.Content>
                  </List.Item>
                ))}
              </List>
            )}
          </Card.Content>
        </Card>
        <Message
          compact
          content="DETAILS OF THE COMPONENTS USED TO BUILD THIS PRODUCT"
        />
        <Card.Group centered>
          {this.state.allParts.map((card) => (
            <Card>
              <Card.Content>
                <Card.Header>{card[2]}</Card.Header>
                <Card.Meta>
                  <strong>serial number :</strong> {card[1]}{" "}
                </Card.Meta>
                <Card.Description>
                  <strong>{nameMapping[card[0]]}</strong> <br />
                  <strong>Manufacturer :</strong> {card[0]} <br />
                  <strong>time of production :</strong>{" "}
                  {JSON.stringify(new Date(card[3] * 1000))} <br />
                </Card.Description>
              </Card.Content>
            </Card>
          ))}
        </Card.Group>
      </div>
    );
  }
  render() {
    return (
      <Layout>
        <div style={{ marginTop: "50px" }}>
          <select
            class="ui dropdown"
            value={this.state.type}
            onChange={this.handleChange}
          >
            <option value="">select one</option>
            <option value="0">part</option>
            <option value="1">Product</option>
          </select>
          <div class="ui action input" style={{ width: "90%" }}>
            <input
              type="text"
              placeholder="serial no....."
              value={this.state.serial_number}
              onChange={(event) =>
                this.setState({ serial_number: event.target.value })
              }
            />
            <button class="ui button" onClick={this.fetchDetails}>
              get details
            </button>
          </div>
          {this.state.success && this.state.part && this.renderParts()}
          {this.state.success && this.state.product && this.renderProduct()}
          {!this.state.success && !!this.state.errorMessage && (
            <Message
              error
              header="Ooops!!!!!!!"
              content={this.state.errorMessage}
            />
          )}
        </div>
      </Layout>
    );
  }
}
export default Contracts;

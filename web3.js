import Web3 from 'web3';

let web3;
if(typeof window !== 'undefined' && typeof window.web3 !== 'undefined'){
    console.log("metamask");
   // web3 = new Web3(window.web3.currentProvider);
     web3 = new Web3(window.ethereum);
    window.ethereum.enable();
    //web3.eth.getAccounts().then(console.log); 
}
else{
    console.log("no metamask");
    const provider = new Web3.providers.HttpProvider(
        'https://rinkeby.infura.io/v3/cd51fb54153a4a8e9e790775b59a0a71'
    );
    web3 = new Web3(provider);
    }
export default web3;/*

//make use of the metamask web3
import Web3 from 'web3';

// const web3 = new Web3(window.web3.currentProvider);
const web3 = new Web3(window.ethereum);
window.ethereum.enable();

export default web3;*/

import web3 from './web3';

import changeOwnership from './build/ChangeOwnership.json';

const instance = new web3.eth.Contract(
    JSON.parse(changeOwnership.interface),
    '0x5Fdd44313f6d0a1a4A7554BB513E31eda008B354'
);

export default instance;
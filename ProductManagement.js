import web3 from './web3';

import ProductManagement from './build/ProductManagement.json';

const instance = new web3.eth.Contract(
    JSON.parse(ProductManagement.interface),
    '0xf9689b275ffe8bd4D6eDa327C37f7438F9094910'
);


export default instance;
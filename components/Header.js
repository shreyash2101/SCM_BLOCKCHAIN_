import React, { component} from 'react';
 import { Menu, Icon } from 'semantic-ui-react';
 import { Link } from '../routes';

 export  default () =>{
    return (
        
            <Menu style = {{ marginTop: '20px'}}>
              <Menu.Item>
              <Link route="/"><a><Icon name='home' size='big' /></a></Link>
              </Menu.Item>
              <Link route="/"><a className = 'item'><h2 style ={{color:'#ff6666'}}>SCM using blockchain</h2></a></Link>
              <Menu.Menu position = "right">
                  
                    <Link route="/contracts/Manufacture_parts"><a className = 'item'><h4> Manufacture Parts</h4></a></Link>
                     
                      <Link route="/contracts/Manufacture_products"><a className = 'item'> <h4>Manufacture Products</h4></a></Link>
                   
                      <Link route="/contracts/sell"><a className = 'item'><h4>Transfer Ownership</h4></a></Link>
                     

              </Menu.Menu>
            </Menu>

    );



 };

import React from 'react'  ; 
import { Container } from 'semantic-ui-react';
import Head from 'next/head';
import Header from './Header';
export default props =>{

return(
    <div>
        <Container>
        <Head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/fomantic-ui/2.8.5/semantic.min.css"/>
        </Head> 
            <Header />
            {props.children}
        </Container>
    </div>
);

}
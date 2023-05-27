import React from "react";

import Footer from "./components/footer";
import Header from "./components/header";
import Content from "./components/content";

import 'react-toastify/dist/ReactToastify.css';


const App = () =>{
    
    return( 
        <>
            <Header />
            <Content />
            <Footer />
        </>
        
    )
   
}

export default App;
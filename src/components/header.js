import React, {useContext, useRef} from "react";

import sunIcon from '../images/icon-sun.svg';
import moonIcon from '../images/icon-moon.svg';
import { ToastContainer, toast } from 'react-toastify';

import { MyContext } from "../context";


const Header = () =>{
    
    const context = useContext(MyContext);
    
    const textInput = useRef();

    const handleSubmit = (e) =>{
        e.preventDefault();
        
        let value = textInput.current.value;
        
        if(value!==""){
            if(context.todos.length < 5 ){
                context.addTask(value);
                textInput.current.value = "";
            }else{
                toast.error("That's enough for the day maan, Hope they are very important task!", {
                    position: toast.POSITION.TOP_LEFT,
                    autoClose: 2000
                });
                textInput.current.value = "";

            }
            
            
        }else{
            toast.error("Input cannot be empty", {
                position: toast.POSITION.TOP_LEFT,
                autoClose: 3000
            })
        }
        
        
    }

    const handleMarkAll = (e) =>{//Function when the top checkbox is clicked to mark all todos completed
        if(e.target.checked){
            context.checkAll()
        }
    }
   
    

    if(context.nightTheme){
        document.querySelector("#root").className = "";//Remove the class lightTheme to the root div which is below the body tag
        return(
            <>
            
            <header className="header">
                <div className="part_1">
                    <h1>TODO</h1>
    
                    <p className="theme_btn" onClick={context.ChangeTheme}>
                        <img src={sunIcon} alt="Day Mode Icon"/>
                    </p>
                </div>
    
                <div className="part_2">
                    <input type='checkbox' name='check' className='checkbox checkall' onChange={(e) => handleMarkAll(e)}/>
                    <form onSubmit={handleSubmit}>
                        <input type="text" placeholder="Create a new todo..." ref={textInput}/>
                    </form>
                </div>
            </header>
            <ToastContainer />
            </>
        )
    }else{
        document.querySelector("#root").className = "lightTheme";//Add class to the root div which is below the body tag
        return(
            <>
            
            <header className="header lightTheme">
                <div className="part_1">
                    <h1>TODO</h1>
    
                    <p className="theme_btn" onClick={ context.RevertTheme}>
                        <img src={moonIcon} alt="Night Mode Icon"/>
                    </p>
                </div>
    
                <div className="part_2">
                    <input type='checkbox' name='check' className='checkbox checkall' onChange={(e) => handleMarkAll(e)}/>
                    <form onSubmit={handleSubmit}>
                        <input type="text" placeholder="Create a new todo..." ref={textInput}/>
                    </form>
                </div>
            </header>
            <ToastContainer />
            </>
        )
    }
    
}
export default Header;
import React, {useContext, useEffect, useState} from 'react';

import delIcon from '../images/icon-cross.svg';


import { MyContext } from "../context";

const Content = () =>{

    const context = useContext(MyContext);

    const [todoList, setTodoList] = useState(context.todos)//A list acting as a handbag from the main todos list
    const [showAll, setShowAll] = useState(true)//To show All the items in the todos list by default
    const [filter, setFilter] = useState("all")//When all,active, completed and clear completed buttons are clicked each to have an active blue color
     
    const handleCheckbox = (e,i) =>{
        let task_name = e.target.parentNode.querySelector(`#task_name-${i}`);
        
        if(e.target.checked){
            context.checkedTask(i)
            task_name.classList.add("marked")
        }else{
           context.uncheckedTask(i)
           task_name.classList.remove("marked")
           
        }
    }

    
    const handleView = (view) => {
        
        switch(view){
            case "all": {
                setShowAll(true)
                setTodoList(context.todos)
                
                setFilter("all")
            }
            break;
            case "active": {
                setShowAll(false)
               let newArray = context.todos.filter(item => item.isActive === true);//Filter the main todos items
               setTodoList(newArray)//Store in todolist handbag

                setFilter("active")
            }
            break;
            case "completed": {
                setShowAll(false)

                let newArray = context.todos.filter(item => item.isActive === false);
                setTodoList(newArray)

                setFilter("completed")
            }

        }
    };

    

    useEffect(() => {
        if(showAll){
        // Initially display all items
            setTodoList(context.todos)
        }
 
        todoList.forEach(item =>{//return the checked mark after re-rendering
            if(item.isActive === false){
                let task_name = document.querySelector(`#task_name-${item.id}`);
                let checkbox = document.querySelector(`#checkbox-${item.id}`);
                
                task_name.classList.add("marked")
                checkbox.checked = true;
            }else{
                let task_name = document.querySelector(`#task_name-${item.id}`);
                let checkbox = document.querySelector(`#checkbox-${item.id}`);
                
                task_name.classList.remove("marked")
                checkbox.checked = false;
            }
            
        })
      },[showAll, todoList, context.todos, handleView, context.checkAll]);
      
    if(context.nightTheme){
        return(
            <>
            <div className='container'>
                <table>
                    <tbody>
                        { todoList.length > 0 ?//Check the list handbag if it has items
                            todoList.map((item)=>{
    
                                return(
                                <tr draggable="true" key={item.id}>
                                    <td>
                                        <input 
                                            type='checkbox' 
                                            className='checkbox'
                                            id={`checkbox-${item.id}`}
                                            onChange={(e) => {handleCheckbox(e, item.id, item.task)}} /> 
                                        <p className='task_name' id={`task_name-${item.id}`}>{item.task}</p>
                                        <button 
                                            className='btn delIcon' 
                                            onClick = {()=> context.deleteTask(item.id)}
                                        >
                                            <img src={delIcon} alt='Delete Icon'/>
                                        </button>
                                    </td>
                                </tr>
                            )
                            })
                            :
                            null
                        }
    
                    </tbody>
                    
                </table>
    
                <div className='part_2'>
                        <p>{context.ItemLeft()} items left</p>
                        <div>
                            <button className={`btn ${filter == "all" ? "active" : ""}`} onClick={()=>handleView("all") }>All</button>
                            <button className={`btn ${filter == "active" ? "active" : ""}`} onClick={()=>handleView("active") }>Active</button>
                            <button className={`btn ${filter == "completed" ? "active" : ""}`} onClick={()=>handleView("completed") }>Completed</button>
                        </div>
                        <div>
                            <button className='btn' onClick={()=>context.clearComplete()}>Clear Completed</button>
                        </div>
                </div>

                <div className='mobile_container'>
                    <button className={`btn ${filter == "all" ? "active" : ""}`} onClick={()=>handleView("all") }>All</button>
                    <button className={`btn ${filter == "active" ? "active" : ""}`} onClick={()=>handleView("active") }>Active</button>
                    <button className={`btn ${filter == "completed" ? "active" : ""}`} onClick={()=>handleView("completed") }>Completed</button>
                </div>
    
               
            </div>
            </>
            
        )
    }else{
        return(
            <>
            <div className='container lightTheme'>
                <table>
                    <tbody>
                        { todoList.length > 0 ?//Check the list handbag if it has items
                            todoList.map((item)=>{
    
                                return(
                                <tr draggable="true" key={item.id}>
                                    <td>
                                        <input 
                                            type='checkbox' 
                                            className='checkbox'
                                            id={`checkbox-${item.id}`}
                                            onChange={(e) => {handleCheckbox(e, item.id, item.task)}} /> 
                                        <p className='task_name' id={`task_name-${item.id}`}>{item.task}</p>
                                        <button 
                                            className='btn delIcon' 
                                            onClick = {()=> context.deleteTask(item.id)}
                                        >
                                            <img src={delIcon} alt='Delete Icon'/>
                                        </button>
                                    </td>
                                </tr>
                            )
                            })
                            :
                            null
                        }
    
                    </tbody>
                    
                </table>
    
                <div className='part_2'>
                        <p>{context.ItemLeft()} items left</p>
                        <div>
                            <button className={`btn ${filter == "all" ? "active": ""}`} onClick={()=>handleView("all") }>All</button>
                            <button className={`btn ${filter == "active" ? "active": ""}`} onClick={()=>handleView("active") }>Active</button>
                            <button className={`btn ${filter == "completed" ? "active": ""}`} onClick={()=>handleView("completed") }>Completed</button>
                        </div>
                        <div>
                            <button className='btn' onClick={()=>context.clearComplete()}>Clear Completed</button>
                        </div>
                </div>
                
                <div className='mobile_container lightTheme'>
                    <button className={`btn ${filter == "all" ? "active" : ""}`} onClick={()=>handleView("all") }>All</button>
                    <button className={`btn ${filter == "active" ? "active" : ""}`} onClick={()=>handleView("active") }>Active</button>
                    <button className={`btn ${filter == "completed" ? "active" : ""}`} onClick={()=>handleView("completed") }>Completed</button>
                </div>
               
            </div>
            </>
            
        )
    }
    
}


export default Content;

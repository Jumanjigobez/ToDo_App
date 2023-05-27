import React, {createContext, useReducer, useState} from 'react';
import { tasksReducer } from '../reducers';

const MyContext = createContext();

const MyProvider = ({children}) =>{

    const [todos, dispatch] = useReducer(tasksReducer, [])
    const [nightTheme, setNightTheme] = useState(true)//For default nightTheme mode

    const handleAddTask = (a) =>{
       dispatch({
        type: 'added',
        id: Math.round(Math.floor(100)*Math.random(10)),
        task: a,
        isActive: true
       })
    }
    
    const handleDeleteTask = (id) =>{
        dispatch({
         type: 'deleted',
         id: id
       
        })
     }

     const handleCheckedTask = (id) =>{
        dispatch({
         type: 'changed',
         id: id,
         isActive: false
       
        })
     }

     const handleUncheckedTask = (id) =>{
        dispatch({
            type: 'changed',
            id: id,
            isActive: true
        })
     }

     const handleItemLeft = () =>{
        let newArray = todos.filter((i)=> i.isActive===true);
        return newArray.length;
     }

     const handleClearComplete = (list) =>{
        dispatch({
            type: 'clearCompleted',

        })
        
     }

     const handleCheckAll = () =>{
        dispatch({
            type: 'changedAll',
        })
        
     }

    const handleChangeTheme = () =>{
        setNightTheme(false)
    }

    const handleRevertTheme = () =>{
        setNightTheme(true)
    }


    return(
        <>
        <MyContext.Provider value={{
            todos: todos,
            nightTheme: nightTheme,
            dispatch: dispatch,
            addTask:handleAddTask,
            deleteTask:handleDeleteTask,
            checkedTask: handleCheckedTask,
            uncheckedTask: handleUncheckedTask,
            ItemLeft: handleItemLeft,
            clearComplete: handleClearComplete,
            ChangeTheme: handleChangeTheme,
            RevertTheme: handleRevertTheme,
            checkAll: handleCheckAll
            
            
        }}>
            {children}
        </MyContext.Provider> 
        
        </>
    )

}

export{
    MyContext,
    MyProvider
}
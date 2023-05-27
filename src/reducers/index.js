export function tasksReducer(todos, action){
    switch(action.type){
        case 'added': {
            return [...todos, {
                id: action.id,
                task: action.task,
                isActive: action.isActive,

            }];
        }
        case 'changed': {
            return todos.map(todo => {
                if (todo.id === action.id) {
                  return {
                    ...todo,
                    isActive: action.isActive,
                  };
                }
                return todo;
              });
           
        }
      
        case 'deleted': {
            return todos.filter(t => t.id !== action.id);
        }
        case 'clearCompleted': {
            return todos.filter(t => t.isActive === true);
        }
        case 'changedAll': {
            return todos.map(todo => {
                if (todo.isActive === true) {
                  return {
                    ...todo,
                    isActive: false,
                  };
                }
                return todo;
              });
           
        }
        default: {
            throw Error('Uknown action: ' + action.type);
        }
    }
}


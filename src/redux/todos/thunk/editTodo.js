import { edit } from "../actions";

const editTodo=(editId, todoText)=>{
    return async (dispatch) =>{
        const response =await fetch(`https://todo-app-assignment90.herokuapp.com/api/todos/${editId}`,{
            method:'PUT',
            body:JSON.stringify({
                text: todoText
            }),
            headers:{
                "Content-type": "application/json; charset= UTF-8" 
            },
        });
        const todo =await response.json()
    
        dispatch(edit(todo.id, todo.text))
    }
}

export default editTodo
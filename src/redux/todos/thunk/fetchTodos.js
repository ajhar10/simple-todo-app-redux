import { loaded } from "../actions";

const fetchTodos = async (dispatch) => {
    const response = await fetch("https://todo-app-assignment90.herokuapp.com/api/todos");
    const todos = await response.json();

    dispatch(loaded(todos));
};

export default fetchTodos;

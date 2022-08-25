import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import fetchTodos from "../redux/todos/thunk/fetchTodos";
import Todo from "./Todo";
import TodoComplete from "./TodoComplete";

export default function TodoList() {
    const todos = useSelector((state) => state.todos);
    const filters = useSelector((state) => state.filters);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTodos);
    }, [dispatch]);

    const filterByStatus = (todo) => {
        const { status } = filters;
        switch (status) {
            case "Complete":
                return todo.completed;

            case "Incomplete":
                return !todo.completed;

            default:
                return true;
        }
    };

    const filterByColors = (todo) => {
        const { colors } = filters;
        if (colors.length > 0) {
            return colors.includes(todo?.color);
        }
        return true;
    };

    return (
        <>
        <div className="mt-2 text-gray-700 text-sm max-h-[300px] overflow-y-auto">
            {todos
                .filter(filterByStatus)
                .filter(filterByColors)
                .map((todo) => (
                    !todo.completed &&
                    <Todo todo={todo} key={todo.id} />
                ))}
        </div>
        <div>
            <div className="bg-emerald-200 mt-4 py-1 font-bold px-2"><p className="text-center">Completed Task</p></div>
            {
                todos.map(todo=>todo.completed && <TodoComplete key={todo.id} todo={todo}></TodoComplete>)
            }
        </div>
        </>
    );
}

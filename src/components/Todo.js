import { useState } from "react";
import { useDispatch } from "react-redux";
import cancelImage from "../assets/images/cancel.png";
import deleteTodo from "../redux/todos/thunk/deleteTodo";
import editTodo from "../redux/todos/thunk/editTodo";
import updateColor from "../redux/todos/thunk/updateColor";
import updateStatus from "../redux/todos/thunk/updateStatus";

export default function Todo({ todo }) {
    const { text, id, completed, color } = todo;

    const dispatch = useDispatch();
    const [isEdit, setIsEdit] = useState(false)

    const [input, setInput] = useState(text)

    const handleStatusChange = (todoId) => {
        dispatch(updateStatus(todoId, completed));
    };

    const handleColorChange = (todoId, color) => {
        dispatch(updateColor(todoId, color));
    };

    const handleDelete = (todoId) => {
        dispatch(deleteTodo(todoId));
    };

    const handleEdit =()=>{
        setIsEdit(!isEdit)
    }

    const handleInput =(e)=>{
        setInput(e.target.value)
    }

    const handleEditTodo=(e)=>{
        e.preventDefault();
        dispatch(editTodo(id,input))
        setIsEdit(!isEdit)
    
    }

    return (
        <div className="flex justify-start items-center p-2 hover:bg-gray-100 hover:transition-all space-x-4 border-b border-gray-400/20 last:border-0">
            <div
                className={`relative rounded-full bg-white border-2 border-gray-400 w-5 h-5 flex flex-shrink-0 justify-center items-center mr-2 ${
                    completed &&
                    "border-green-500 focus-within:border-green-500"
                }`}
            >
                <input
                    type="checkbox"
                    checked={completed}
                    onChange={() => handleStatusChange(id)}
                    className="opacity-0 absolute rounded-full"
                />
                {completed && (
                    <svg
                        className="fill-current w-3 h-3 text-green-500 pointer-events-none"
                        viewBox="0 0 20 20"
                    >
                        <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
                    </svg>
                )}
            </div>

            {
    isEdit? 
    <div className="mr-auto flex-1">
        <form onSubmit={handleEditTodo}>
             <input
            value={input}
            onChange={handleInput}
            type="text"
            // placeholder={text}
            className=" px-4 py-1  mr-2 border-none outline-none bg-slate-200"
            />
                    <button
                    type="submit"
                    className="appearance-none bg-emerald-200 w-12 h-7  ">
                    save</button>
        </form>
    </div>

            :
    <div className={`select-none flex-1 ${completed && 'line-through'}`}>
    {text}
    </div>    
    }

            <div className="flex-shrink-0 h-4 w-4 cursor-pointer" onClick={handleEdit}>
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16"> <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/> </svg>
            </div>

            <div
                className={`flex-shrink-0 h-4 w-4 rounded-full border-2 ml-auto cursor-pointer hover:bg-green-500 border-green-500 ${
                    color === "green" && "bg-green-500"
                }`}
                onClick={() => handleColorChange(id, "green")}
            ></div>

            <div
                className={`flex-shrink-0 h-4 w-4 rounded-full border-2 ml-auto cursor-pointer hover:bg-yellow-500 border-yellow-500 ${
                    color === "yellow" && "bg-yellow-500"
                }`}
                onClick={() => handleColorChange(id, "yellow")}
            ></div>

            <div
                className={`flex-shrink-0 h-4 w-4 rounded-full border-2 ml-auto cursor-pointer hover:bg-red-500 border-red-500 ${
                    color === "red" && "bg-red-500"
                }`}
                onClick={() => handleColorChange(id, "red")}
            ></div>

            <img
                src={cancelImage}
                className="flex-shrink-0 w-4 h-4 ml-2 cursor-pointer"
                alt="Cancel"
                onClick={() => handleDelete(id)}
            />
        </div>
    );
}

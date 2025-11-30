import React from 'react';

import { Todo } from './Todo';

interface Props {
    todo: Todo;
    deleteTodo: (id: number) => void;
    completeTodo: (id: number) => void;
}

const TodoItem = ({ todo, deleteTodo, completeTodo }: Props) => {

    return <div className='todo-item'>
        <span className={todo.completed ? "completed-todo" : ""}>{todo.text}</span>
        <div className="todo-actions">
            <button className="todo-complete-btn" onClick={() => completeTodo(todo.id)}>
                {todo.completed ? "Undo" : "Complete"}
            </button>
            <button className="todo-delete-btn" onClick={() => deleteTodo(todo.id)}>Delete</button>
        </div>
    </div>;
}

export default TodoItem;
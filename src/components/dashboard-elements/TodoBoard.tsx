import React, { useState } from 'react';
import './elements.css'

import { Todo } from './dashboard-items/Todo';
import TodoItem from '../dashboard-elements/dashboard-items/TodoItem';

import { logout } from '../../auth/authService';

const TodoBoard = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [newTodo, setNewTodo] = useState<string>("");

    const addTodo = () => {
        if (newTodo.trim() === "") return;
        const newTodoItem: Todo = {
            id: Date.now(),
            text: newTodo,
            completed: false,
        };
        setTodos([...todos, newTodoItem]);
        setNewTodo("");
    };

    const handleAddTodo = (e: React.FormEvent) => {
        e.preventDefault();
        addTodo();
    }

    const completeTodo = (id: number) => {
        setTodos(todos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ));
    }

    const deleteTodo = (id: number) => {
        setTodos(todos.filter(todo => todo.id !== id));
    }

    const handleLogout = () => {
        logout();
        window.location.reload();
    }

    return (<div className="todo-board">
        <form className="todo-form" onSubmit={handleAddTodo}>
            <input 
                type="text"
                value={newTodo}
                className="todo-input"
                onChange={(e) => setNewTodo(e.target.value)}
            />
            <button type="submit" className="todo-add-btn">Add Todo</button>
        </form>
        <div className="todo-list">
            {todos.map(todo => (
                <TodoItem key={todo.id} todo={todo} deleteTodo={deleteTodo} completeTodo={completeTodo} />
            ))}
        </div>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
    </div>)
}

export default TodoBoard;
import React, { useEffect, useState } from 'react';
import './elements.css'

import { Todo } from './dashboard-items/Todo';
import TodoItem from '../dashboard-elements/dashboard-items/TodoItem';

import { logout } from '../../auth/authService';
import { fetchTodos } from '../agents/todoAgent';

const TodoBoard = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [newTodo, setNewTodo] = useState<string>("");

    const loadTodos = async () => {
        try {
            const fetchedTodos = await fetchTodos();
            setTodos(fetchedTodos);
        } catch (error) {
            console.error("Failed to load todos:", error);
        }
    };

    useEffect(() => {
        loadTodos();
    }, []);

    const addTodo = () => {
        if (newTodo.trim() === "") return;
        const newTodoItem: Todo = {
            text: newTodo,
            completed: false,
            userId: "",
            _id: ""
        };
        setTodos([...todos, newTodoItem]);
        setNewTodo("");
    };

    const handleAddTodo = (e: React.FormEvent) => {
        e.preventDefault();
        addTodo();
    }

    const completeTodo = (_id: string) => {
        setTodos(todos.map(todo =>
            todo._id === _id ? { ...todo, completed: !todo.completed } : todo
        ));
    }

    const deleteTodo = (_id: string) => {
        setTodos(todos.filter(todo => todo._id !== _id));
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
                <TodoItem key={todo._id} todo={todo} deleteTodo={deleteTodo} completeTodo={completeTodo} />
            ))}
        </div>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
    </div>)
}

export default TodoBoard;
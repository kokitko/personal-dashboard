import React, { useEffect, useState } from 'react';
import './elements.css'

import { Todo } from './dashboard-items/Todo';
import TodoItem from '../dashboard-elements/dashboard-items/TodoItem';

import { logout } from '../../auth/authService';
import { fetchTodos, addTodo, toggleCompleteTodo, deleteTodo } from '../agents/todoAgent';

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

    const handleAddTodo = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (newTodo.trim() === "") return;
        try {
            const addedTodo = await addTodo({ text: newTodo });
            if (!addedTodo) return;
            setTodos([...todos, addedTodo]);
            setNewTodo("");
        } catch (error) {
            console.error("Failed to add todo:", error);
        }
    };

    const handleCompleteTodo = (_id: string) => {
        toggleCompleteTodo(_id)
            .then(() => {
                setTodos(todos.map(todo =>
                    todo._id === _id ? { ...todo, completed: !todo.completed } : todo
                ));
            })
            .catch(error => {
                console.error("Failed to toggle todo completion:", error);
            });
    }

    const handleDeleteTodo = (_id: string) => {
        deleteTodo(_id)
            .then(() => {
                setTodos(todos.filter(todo => todo._id !== _id));
            })
            .catch(error => {
                console.error("Failed to delete todo:", error);
            });
    }

    useEffect(() => {
        loadTodos();
    }, []);

    const handleLogout = () => {
        logout();
        window.location.reload();
    }

    return (<div className="todo-board">
        <form className="todo-form" onSubmit={(e) => handleAddTodo(e)}>
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
                <TodoItem key={todo._id} todo={todo} deleteTodo={handleDeleteTodo} completeTodo={handleCompleteTodo} />
            ))}
        </div>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
    </div>)
}

export default TodoBoard;
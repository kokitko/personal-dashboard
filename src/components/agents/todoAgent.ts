import { getAccessToken } from "../../auth/authService";
import { RawTodo, Todo } from "../dashboard-elements/dashboard-items/Todo";

const backendApi: string | undefined = process.env.REACT_APP_BACKEND_API_URL;

export const fetchTodos: () => Promise<Todo[]> = async () => {
    try {
        const response = await fetch(`${backendApi}/todo`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${getAccessToken()}`
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error. status ${response.status}`);
        }
        const data: Array<Todo> = await response.json();
        return data;
    } catch (error) {
        console.error('Error while fetching todos:', error);
        throw error;
    }
};

export const addTodo: (todo: RawTodo) => Promise<Todo> = async (todo) => {
    try {
        const response = await fetch(`${backendApi}/todo`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${getAccessToken()}`
            },
            body: JSON.stringify(todo)
        });
        if (!response.ok) {
            throw new Error(`HTTP error. status ${response.status}`);
        }
        const data: Todo = await response.json();
        return data;
    } catch (error) {
        console.error('Error while adding todo:', error);
        throw error;
    }
};

export const toggleCompleteTodo = async (_id: string): Promise<void> => {
    try {
        const response = await fetch(`${backendApi}/todo/${_id}/toggle`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${getAccessToken()}`
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error. status ${response.status}`);
        }
    } catch (error) {
        console.error('Error while toggling todo completion:', error);
        throw error;
    }
};

export const deleteTodo = async (_id: string): Promise<void> => {
    try {
        const response = await fetch(`${backendApi}/todo/${_id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${getAccessToken()}`
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error. status ${response.status}`);
        }
    } catch (error) {
        console.error('Error while deleting todo:', error);
        throw error;
    }
}



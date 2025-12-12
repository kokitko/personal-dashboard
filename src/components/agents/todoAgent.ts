import { getAccessToken } from "../../auth/authService";
import { Todo } from "../dashboard-elements/dashboard-items/Todo";

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


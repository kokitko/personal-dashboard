import { RawTodo, Todo } from "../dashboard-elements/dashboard-items/Todo";
import axiosInstance from "./axiosInstance";

export const fetchTodos: () => Promise<Todo[]> = async () => {
    try {
        const response = await axiosInstance.get<Array<Todo>>('/api/todo');
        if (response.status !== 200) {
            throw new Error(`HTTP error. status ${response.status}`);
        }
        const data: Array<Todo> = response.data;
        return data;
    } catch (error) {
        console.error('Error while fetching todos:', error);
        throw error;
    }
};

export const addTodo: (todo: RawTodo) => Promise<Todo> = async (todo) => {
    try {
        const response = await axiosInstance.post<Todo>('/api/todo', todo);
        if (response.status !== 201) {
            throw new Error(`HTTP error. status ${response.status}`);
        }
        const data: Todo = response.data;
        return data;
    } catch (error) {
        console.error('Error while adding todo:', error);
        throw error;
    }
};

export const toggleCompleteTodo = async (_id: string): Promise<void> => {
    try {
        const response = await axiosInstance.put<void>(`/api/todo/${_id}/toggle`);
        if (response.status !== 200) {
            throw new Error(`HTTP error. status ${response.status}`);
        }
    } catch (error) {
        console.error('Error while toggling todo completion:', error);
        throw error;
    }
};

export const deleteTodo = async (_id: string): Promise<void> => {
    try {
        const response = await axiosInstance.delete<void>(`/api/todo/${_id}`);
        if (response.status !== 200) {
            throw new Error(`HTTP error. status ${response.status}`);
        }
    } catch (error) {
        console.error('Error while deleting todo:', error);
        throw error;
    }
}



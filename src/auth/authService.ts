import axiosInstance from "../components/agents/axiosInstance";
let accessToken: string = "none";

export const register = async (email: string, username: string, password: string) => {
    try {
        const response = await axiosInstance.post('/api/register', {
            email,
            username,
            password
        });
        if (response.status !== 201) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response;
    } catch (error) {
        console.error('Error during registration:', error);
        throw error;
    }
}

export const login = async (email: string, password: string) => {
    try {
        const response = await axiosInstance.post('/api/login', {
            email,
            password
        });
        if (response.status !== 200) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        accessToken = response.data.accessToken;
        localStorage.setItem('accessToken', accessToken);
        return response;
    }
    catch (error) {
        console.error('Error during login:', error);
        throw error;
    }
}

export const logout = async () => {
    accessToken = "none";
    localStorage.removeItem('accessToken');
    const response = await axiosInstance.post('/api/logout');
    return response;
}

export const getAccessToken = () => {
    if (accessToken === "none") {
        accessToken = localStorage.getItem('accessToken') ? localStorage.getItem('accessToken')! : "none";
    }
    return accessToken;
}


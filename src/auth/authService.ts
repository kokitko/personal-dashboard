const backendApi: string | undefined = process.env.REACT_APP_BACKEND_API_URL;
let accessToken: string = "none";

export const register = async (email: string, username: string, password: string) => {
    try {
        const response = await fetch(`${backendApi}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, username, password }),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response;
    } catch (error) {
        console.error('Error during registration:', error);
        throw error;
    }
}

export const login = async (username: string, password: string) => {
    try {
        const response = await fetch(`${backendApi}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ username, password }),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        accessToken = (await response.json()).accessToken;
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
    const response = await fetch(`${backendApi}/logout`, {
        method: 'POST',
        credentials: 'include'
    });
    return response;
}

export const getAccessToken = () => {
    if (accessToken === "none") {
        accessToken = localStorage.getItem('accessToken') ? localStorage.getItem('accessToken')! : "none";
    }
    return accessToken;
}

export const refreshToken = async () => {
    try {
        const response = await fetch(`${backendApi}/token`, {
            method: 'POST',
            credentials: 'include'
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        accessToken = (await response.json()).accessToken;
        localStorage.setItem('accessToken', accessToken);
        return accessToken;
    } catch (error) {
        accessToken = "none";
        localStorage.removeItem('accessToken');
        throw error;
    }
}


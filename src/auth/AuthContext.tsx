import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { getAccessToken, refreshToken } from './authService';

const AuthContext = createContext<{
                    isAuthenticated: boolean; 
                    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>; 
                    ready: boolean}>
                        ({isAuthenticated: false, setIsAuthenticated: () => {}, ready: false});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [ready, setReady] = useState<boolean>(false);

    useEffect(() => {
        const initAuth = async () => {
            try {
                const token = await getAccessToken();
                if (token === "none") {
                    setIsAuthenticated(false);
                    return;
                }
                const response = await refreshToken();
                if (response) {
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                }
            } catch (error) {
                setIsAuthenticated(false);
            } finally {
                setReady(true);
            }
        };
        initAuth();
    }, []);

    return (
        <AuthContext.Provider value={{
            isAuthenticated,
            setIsAuthenticated,
            ready
        }}>
            {children}    
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);
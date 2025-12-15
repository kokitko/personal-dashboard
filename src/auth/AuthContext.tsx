import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { getAccessToken } from './authService';

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
                } else {
                    setIsAuthenticated(true);
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
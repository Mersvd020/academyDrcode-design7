import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadUserData = () => {
            try {
                const savedUser = localStorage.getItem("user");
                const savedToken = localStorage.getItem("token");
                
                if (savedUser && savedToken) {
                    const parsedUser = JSON.parse(savedUser);
                    setUser(parsedUser);
                    setToken(savedToken);
                    setAuthenticated(true);
                }
            } catch (error) {
                console.error("Error loading user data:", error);
               
                localStorage.removeItem("user");
                localStorage.removeItem("token");
            } finally {
                setLoading(false);
            }
        };

        loadUserData();
    }, []);

    const login = (authToken, userData) => {
        try {
           
            if (authToken) {
                localStorage.setItem("token", authToken);
                setToken(authToken);
            }
            
           
            if (userData) {
                localStorage.setItem("user", JSON.stringify(userData));
                setUser(userData);
            }
            
            setAuthenticated(true);
        } catch (error) {
            console.error("Error during login:", error);
        }
    };

    const logout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setUser(null);
        setToken(null);
        setAuthenticated(false);
    };

    const updateUser = (newUserData) => {
        try {
            const updatedUser = { ...user, ...newUserData };
            localStorage.setItem("user", JSON.stringify(updatedUser));
            setUser(updatedUser);
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };

    return (
        <AuthContext.Provider 
            value={{ 
                user, 
                token,
                authenticated, 
                loading,
                login, 
                logout,
                updateUser
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
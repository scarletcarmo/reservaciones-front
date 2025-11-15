import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
    id: number;
    username: string;
    email: string;
    role: string;
    token: string;
}

interface AuthContextType {
    user: User | null;                   
    isAuthenticated: boolean;           
    login: (userData: User) => void;    
    logout: () => void;                  
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

    const login = (userData: User) => {
        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem("user");
        setUser(null);
    };

    // Carga el usuario almacenado
    useEffect(() => {
        const storedUserStr = localStorage.getItem("user");
        if (storedUserStr && storedUserStr !== "undefined") {
            try {
                const storedUser: User = JSON.parse(storedUserStr);
                setUser(storedUser);
            } catch (error) {
                console.error("Error al parsear usuario de localStorage:", error);
                localStorage.removeItem("user");
            }
        }
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated: !!user,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth debe usarse dentro de un AuthProvider");
    }
    return context;
};

import { useContext, createContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

// 1. Configure the global axios base URL
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const navigate = useNavigate();
    const [token, setToken] = useState(null);
    const [blogs, setBlogs] = useState([]);
    const [input, setInput] = useState("");

    // 2. Function to fetch initial blogs
    const fetchBlogs = async () => {
        try {
            const { data } = await axios.get("/api/blog/all");
            if (data.success) {
                setBlogs(data.blogs);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error("Fetch error:", error);
            // Optional: toast.error("Could not fetch blogs");
        }
    };

    // 3. Load token from storage and trigger initial fetch
    useEffect(() => {
        fetchBlogs();
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
            axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
        }
    }, []); 

    // 4. Value object passed to all components via Context
    // Crucial: 'axios' is included here to prevent "undefined" errors
    const value = { 
        token, 
        setToken, 
        blogs, 
        setBlogs, 
        input, 
        setInput,
        navigate,
        axios 
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
}


export const useAppContext = () => {
    return useContext(AppContext);
};
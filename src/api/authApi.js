import { toast } from 'sonner';
import apiClient from "../config/axios";

export const login = async (loginData) => {
    try {
        const response = await apiClient.post('/login', loginData);
        return response.data;
    } catch (error) {
        toast.error('Login failed. Please check your credentials.');
        console.error(error);
    }
};

export const registerUser = async (registerData) => {
    try {
        const response = await apiClient.post('/register', registerData);
        return response.data;
    } catch (error) {
        toast.error('Registration failed. Please try again.');
        console.error(error);
    }
};



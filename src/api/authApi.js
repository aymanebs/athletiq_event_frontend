
import apiClient from "../config/axios"


export const  login = async(loginData)=>{
    try{
       const response = await apiClient.post('/login',loginData);
       return response.data;
    }
    catch(error){
        console.error('Error to log in', error);
        throw error;
    }
}

export const registerUser = async(registerData)=>{
    try{
        const response = await apiClient.post('/register',registerData);
        return response.data;
    }
    catch(error){
        console.error('Error registering user',error);
        throw error;
    }
}
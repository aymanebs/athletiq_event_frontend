import apiClient from "../config/axios"


export const getEvents = async()=>{
    try{
        const response = await apiClient.get('/events');
        return response.data;
    }
    catch(error){
        console.error('Failed to fetch events',error)
        throw error;     
    }   
}

export const createEvent = async(eventData)=>{
    try{
        const response = await apiClient.post('/events',eventData);
        return response.data;
    }
    catch(error){
        console.error('Failed to create event',error);
        throw error;
    }
}

export const updateEvent = async (eventId,data)=>{
    try{
        const response = await apiClient.put(`/events/${eventId}`,data);
        return response.data;
    }
    catch(error){
        console.error('Failed to update event',error);
        throw error;
    }
}

export const deleteEvent = async (eventId) =>{
    try{
        const response = await apiClient.delete(`/events/${eventId}`);
        return response.data;
    }
    catch(error){
        console.error('Failed to delete event',error);
        throw error;
    }
}

export const getOneEvent = async(eventId) => {
    try{
        const response = await apiClient.get(`/events/${eventId}`);
        return response.data;
    }
    catch(error){
        console.error('Failed to fetch the event',error);
        throw error;
    }
}
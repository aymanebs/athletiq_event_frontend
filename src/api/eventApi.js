import apiClient from "../config/axios"


export const getEvents = async()=>{
    try{
        const response = await apiClient.get('/events');
        return response.data;
    }
    catch(error){
        console.error('Failed to fetch events',error)
        toast.error('Failed to fetch events');    
    }   
}

export const createEvent = async(eventData)=>{
    try{
        const response = await apiClient.post('/events',eventData);
        return response.data;
    }
    catch(error){
        console.error('Failed to create event',error);
        toast.error('Failed to create event');
    }
}

export const updateEvent = async (eventId,data)=>{
    try{
        const response = await apiClient.put(`/events/${eventId}`,data);
        return response.data;
    }
    catch(error){
        console.error('Failed to update event',error);
        toast.error('Failed to update event');
    }
}

export const deleteEvent = async (eventId) =>{
    try{
        const response = await apiClient.delete(`/events/${eventId}`);
        return response.data;
    }
    catch(error){
        console.error('Failed to delete event',error);
        toast.error('Failed to delete event');
    }
}

export const getOneEvent = async(eventId) => {
    try{
        const response = await apiClient.get(`/events/${eventId}`);
        return response.data;
    }
    catch(error){
        console.error('Failed to fetch the event',error);
        toast.error('Failed to fetch the event');
    }
}
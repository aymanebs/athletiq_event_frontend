import apiClient from "../config/axios"

export const addParticipant = async (eventId,participantData) => {
    try{
        const response = await apiClient.post(`/events/${eventId}/participants`,participantData);
        return response.data;
    }
    catch(error){
        console.error('Failed to insert participant');
        toast.error('Failed to insert participant');
    }
}

export const removeParticipant = async(eventId,participantId) => {
    try{
        const response = await apiClient.delete(`/events/${eventId}/participants/${participantId}`);
        return response.data;
    }
    catch(error){
        console.error('Failed to remove participant from event',error);
        toast.error('Failed to remove participant from event');
    }
}

export const updateParticipant = async(eventId,participantId,participantData) =>{
    try{
        const response = await apiClient.put(`/events/${eventId}/participants/${participantId}`,participantData);
        return response.data;
    }
    catch(error){
        console.error('Failed to update the participant',error);
        toast.error('Failed to update the participant');
    }
} 


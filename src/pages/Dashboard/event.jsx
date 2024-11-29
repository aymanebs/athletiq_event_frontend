import { useEffect, useState } from "react";
import EventCard from "../../components/event-card";
import { deleteEvent, getEvents } from "../../api/eventApi.js";
import AddEventModal from "../../components/add-event-modal";
import UpdateEventModal from "../../components/update-event-modal.jsx";
import DeleteConfirmationModal from "../../components/delete-confirmation-modal.jsx";



const Event = () =>{

    const [events,setEvents] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    // Fetching events
    useEffect(()=>{
    const fetchEvents = async() =>{
        try{
            const data = await getEvents(); 
            setEvents(data);
        }
        catch(error){
            throw error;
        }
    }
        fetchEvents()
    },[]);

    // Updating the state to include new event created
    const handleAddEvent = (newEvent) => {
        setEvents((prevEvents) => [...prevEvents, newEvent]);
        setIsModalOpen(false);
      };

    // Handle edit button

    const handleEditClick = (event) => {
        setSelectedEvent(event); 
        setIsUpdateModalOpen(true);
      };

    // Handle update

    const handleUpdateEvent = (updatedEvent) => {
        setEvents((prevEvents) =>
          prevEvents.map((event) => (event._id === updatedEvent._id ? updatedEvent : event))
        );
        setIsUpdateModalOpen(false);
      };

    // Trigger delete  modal
    const handleDeleteClick = (event) => {
        setSelectedEvent(event);
        setIsDeleteModalOpen(true); 
    };
   
      // Confirm deletion
  const handleDeleteConfirm = async () => {
    try {
      await deleteEvent(selectedEvent._id); 
      setEvents((prevEvents) =>
        prevEvents.filter((event) => event._id !== selectedEvent._id)
      );
      setIsDeleteModalOpen(false); 
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

    return(

    <div className="grid gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <button className="bg-gray-900 hover:bg-gray-700 text-white font-bold py-2 px-12 rounded"
          onClick={() => setIsModalOpen(true)}
          >
            Create an event
          </button>
        </div>
        
       
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {events.map((event)=>{
            return(
             <EventCard
             key={event._id}
             id={event._id}
             image="/api/placeholder/300/150"
             title={event.title}
             date={event.date}
            //  time={event.date}
             location={event.address}
             capacity={event.capacity}
             type={event.type}
             typeColor="bg-blue-100 text-blue-800"
             onEdit={() => handleEditClick(event)}
             onDelete={() => handleDeleteClick(event)}
             
           />
            )
        })}
      </div>

      <AddEventModal
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddEvent}
      />

        {isUpdateModalOpen && selectedEvent && (
        <UpdateEventModal
          isOpen={isUpdateModalOpen}
          onClose={() => setIsUpdateModalOpen(false)}
          eventData={selectedEvent}
          onUpdate={handleUpdateEvent}
        />
      )}

    
        <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm} 
      />
      </div>
      
    )
}

export default Event;
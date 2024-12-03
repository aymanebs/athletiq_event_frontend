import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getOneEvent } from "../../api/eventApi";
import AddParticipantModal from "../../components/Add-participant-modal";
import { removeParticipant } from "../../api/participantApi";
import UpdateParticipantModal from "../../components/Update-participant-modal";
import { Plus, Download, Edit, Trash2 } from "lucide-react";
import { CSVLink } from "react-csv"; 

const Participant = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedParticipant, setSelectedParticipant] = useState(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  useEffect(() => {
    const fetchEvent = async (eventId) => {
      try {
        const data = await getOneEvent(eventId);
        setEvent(data);
        setParticipants(data.participants);
      } catch (error) {
        throw error;
      }
    };
    fetchEvent(eventId);
  }, [eventId]);

  const handleAddParticipant = (newParticipant) => {
    setParticipants((prevParticipants) => [...prevParticipants, newParticipant]);
    setIsAddModalOpen(false);
  };

  const handleReomveParticipant = async (participantId) => {
    try {
      const data = await removeParticipant(eventId, participantId);
      setParticipants((prevParticipants) =>
        prevParticipants.filter((participant) => participant._id !== data)
      );
    } catch (error) {
      throw error;
    }
  };

  const handleEditClick = (participant) => {
    setSelectedParticipant(participant);
    setIsUpdateModalOpen(true);
  };

  const handleUpdate = (updatedParticipant) => {
    setParticipants((prevParticipants) =>
      prevParticipants.map((participant) =>
        participant._id === updatedParticipant._id ? updatedParticipant : participant
      )
    );
    setIsUpdateModalOpen(false);
  };

  // Prepare data for download
  const csvData = participants.map((participant) => ({
    fullname: participant.fullname,
    email: participant.email,
    phone: participant.phone,
  }));

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">

       {/* Event Details Section */}
       <div className="bg-white shadow-xl rounded-xl overflow-hidden">
          <div className="bg-gray-50 px-4 py-5 sm:px-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900">{event?.title}</h2>
                <p className="text-gray-600 mt-2">{event?.description}</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-gray-600">{event?.address}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-gray-600">{new Date(event?.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span className="text-gray-600">{event?.type}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
       {/* Participants Section */}
      <div className="bg-white shadow-xl rounded-xl overflow-hidden">
        <div className="bg-gray-50 px-4 py-5 sm:px-6 flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-gray-900">Event Participants</h2>
          <div className="flex items-center space-x-2">
            <button
              className="bg-gray-900 hover:bg-gray-700 text-white p-2 rounded-full flex items-center justify-center transition-colors duration-200"
              onClick={() => setIsAddModalOpen(true)}
              title="Add Participant"
            >
              <Plus className="w-5 h-5" />
            </button>
            <CSVLink
              data={csvData}
              filename="participants.csv" 
              className="bg-gray-900 hover:bg-gray-700 text-white p-2 rounded-full flex items-center justify-center transition-colors duration-200"
              title="Download Participants"
            >
              <Download className="w-5 h-5" />
            </CSVLink>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Full Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone Number</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {participants.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center py-4 text-gray-500">No participants found.</td>
                </tr>
              ) : (
                participants.map((participant) => (
                  <tr key={participant._id} className="hover:bg-gray-50 transition-colors duration-200">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{participant.fullname}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{participant.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{participant.phone}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button
                          className="text-blue-600 hover:text-blue-900 transition-colors duration-200 p-1 rounded-full hover:bg-blue-100"
                          onClick={() => handleEditClick(participant)}
                          title="Edit Participant"
                        >
                          <Edit className="w-5 h-5" />
                        </button>
                        <button
                          className="text-red-600 hover:text-red-900 transition-colors duration-200 p-1 rounded-full hover:bg-red-100"
                          onClick={() => handleReomveParticipant(participant._id)}
                          title="Remove Participant"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      <AddParticipantModal
        id={eventId}
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddParticipant}
      />

      <UpdateParticipantModal
        id={eventId}
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        onSubmit={handleUpdate}
        participant={selectedParticipant}
      />
    </div>
  );
};

export default Participant;

import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getOneEvent } from "../../api/eventApi";
import AddParticipantModal from "../../components/add-participant-modal";
import { removeParticipant } from "../../api/participantApi";
import UpdateParticipantModal from "../../components/update-participant-modal";
import { Plus, Download, Edit, Trash2 } from "lucide-react";
import { CSVLink } from "react-csv"; // Import CSVLink

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

  // Prepare data for CSV download
  const csvData = participants.map((participant) => ({
    fullname: participant.fullname,
    email: participant.email,
    phone: participant.phone,
  }));

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
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

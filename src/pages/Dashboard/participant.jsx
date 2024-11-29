import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getOneEvent } from "../../api/eventApi";


const Participant = () =>{

    const {eventId} = useParams();
    const[event,setEvent]=useState(null);
    const [participants, setParticipants] =useState([]);

    console.log('eventId', eventId);

    useEffect(()=>{
        const fetchEvent = async (eventId)=>{
            try{
                const data = await getOneEvent(eventId);
                setEvent(data);
                setParticipants(data.participants); 
            }
            catch(error){
                throw error;
            }
        }

        fetchEvent(eventId);
    },[eventId]);


    return(
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white shadow-lg rounded-xl overflow-hidden">
          {/* Header Section */}
          <div className="bg-gray-50 px-4 py-5 sm:px-6 flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-gray-900">Event Participants</h2>
          </div>
  
          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Full Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Phone Number
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
             
                 <tbody className="bg-white divide-y divide-gray-200">
                
                {participants.map((participant)=>{
                return(

                            <tr 
                            key={participant._id} 
                            className="hover:bg-gray-50 transition-colors duration-200"
                        >
                           
                            <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                                {participant.fullname}
                            </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">
                                {participant.email}
                            </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {participant.phone}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex items-center space-x-2">
                                <button 
                                className="text-blue-600 hover:text-blue-900 transition-colors duration-200"
                                onClick={() => {/* View Details */}}
                                >
                                View
                                </button>
                                <button 
                                className="text-red-600 hover:text-red-900 transition-colors duration-200"
                                onClick={() => {/* Remove Participant */}}
                                >
                                Remove
                                </button>
                            </div>
                            </td>
                        </tr>
                        )
                    })}
                </tbody>
              
             
            </table>
          </div>
  
          {/* Footer with Pagination (placeholder) */}
          <div className="bg-gray-50 px-4 py-3 flex items-center justify-between sm:px-6">
            <div className="flex-1 flex justify-between sm:hidden">
              <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                Previous
              </button>
              <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                Next
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium"></span> participants
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}

export default Participant;
import React from 'react';
import { Calendar, Edit, MapPin, Trash, Users } from 'lucide-react';
import EventTypeBadge from './event-type-badge';
import { Link } from 'react-router';

const EventCard = ({
  id,
  image,
  title,
  date,
  time,
  location,
  capacity,
  type = 'Conference',
  typeColor = 'bg-blue-100 text-blue-800',
  onEdit,
  onDelete,
}) => (
  <div className="bg-white rounded-lg shadow-lg overflow-hidden relative transition-transform transform hover:scale-105 hover:shadow-2xl">
    {/* Card Content */}
    <Link to={`/events/${id}/participants`} className="block">
      <img
        className="h-32 w-full object-cover"
        src={image || '/api/placeholder/300/150'}
        alt={title}
      />
      <div className="p-3 space-y-2">
        <h3 className="text-lg font-bold truncate">{title}</h3>
        <EventTypeBadge type={type} color={typeColor} />
        <div className="flex items-center text-gray-600 text-sm">
          <Calendar className="mr-1 w-4 h-4" />
          <span>
            {date} | {time}
          </span>
        </div>
        <div className="flex items-center text-gray-600 text-sm">
          <MapPin className="mr-1 w-4 h-4" />
          <span className="truncate">{location}</span>
        </div>
        <div className="flex items-center text-gray-600 text-sm">
          <Users className="mr-1 w-4 h-4" />
          <span>Capacity: {capacity}</span>
        </div>
      </div>
    </Link>

    <div className="absolute top-2 right-2 flex space-x-2">
      <button
        onClick={(e) => {
          e.preventDefault(); 
          onEdit();
        }}
        className="bg-slate-500 hover:bg-slate-700 text-white font-bold py-1 px-2 rounded"
      >
        <Edit className="w-4 h-4" />
      </button>
      <button
        onClick={(e) => {
          e.preventDefault(); 
          onDelete();
        }}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
      >
        <Trash className="w-4 h-4" />
      </button>
    </div>
  </div>
);

export default EventCard;

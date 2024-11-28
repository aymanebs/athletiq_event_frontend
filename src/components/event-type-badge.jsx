const EventTypeBadge = ({ type, color }) => (
    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${color}`}>{type}</span>
  );

export default EventTypeBadge;
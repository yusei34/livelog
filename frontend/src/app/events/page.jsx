'use client'
import EventCard from "../../components/EventCard";


const dummyData = [
    {
        id: '1',
        title: 'Summer Rock Fest',
        date: '2025-08-01',
        venue: 'Tokyo Dome',
        actors: ['a1', 'a2', 'a3'],
    },
];

export default function EventsPage() {
    return (
      <div>
        {dummyData.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    );
  }
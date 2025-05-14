"use client";
import EventCard from '../../components/EventCard';
import { useEffect, useState } from "react";

import axios from "axios";

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/events`
    axios
      .get(apiUrl)
      .then((response) => {
        setEvents(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('API通信に失敗しました:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Events</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))
      )}
    </div>
  );
}
// const dummyData = [
//     {
//         id: '1',
//         title: 'Summer Rock Fest',
//         date: '2025-08-01',
//         venue: 'Tokyo Dome',
//         actors: ['a1', 'a2', 'a3'],
//     },
// ];

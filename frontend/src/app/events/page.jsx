'use client';

import { useState, useEffect } from "react";
import { fetchEvents } from "@/lib/fetchEvents";
import EventCard from "@/components/EventCard";
import EventFormModal from "@/components/EventFormModal";

export default function EventsPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents().then(setEvents);
  }, []);

  const bgStyle = isOpen ? " p-4 space-y-6 opacity-40" : " p-4 space-y-6 "

  return (
    <div  className={bgStyle}>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">イベント一覧</h1>
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + 新規イベント
        </button>
      </div>

      {events.length === 0 ? (
        <p>イベントがありません</p>
      ) : (
        events.map((event) => <EventCard key={event.id} event={event} />)
      )}

      <EventFormModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
}

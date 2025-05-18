"use client";

import { useState, useEffect } from "react";
import { fetchEvents } from "@/lib/fetchEvents";
import EventCard from "@/components/EventCard";
import EventFormModal from "@/components/EventFormModal";
import OpenModalButton from "@/components/OpenModalButton";

export default function EventsPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents().then(setEvents);
  }, []);

  return (
    <div className="p-4 m-8 space-y-6 ">
      <h1 className="text-2xl font-bold">イベント一覧</h1>

      <div className="flex justify-end">
        <OpenModalButton />
      </div>
      <div className="grid grid-cols-4">
        {events.length === 0 ? (
          <p>イベントがありません</p>
        ) : (
          events.map((event) => <EventCard key={event.id} event={event} />)
        )}
      </div>

      <EventFormModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
}

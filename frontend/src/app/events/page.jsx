"use client";

import { useState, useEffect } from "react";
import { Button } from '@headlessui/react'
import { fetchEvents } from "@/lib/fetchEvents";
import Link from 'next/link'
import EventCard from "@/components/EventCard";
import EventFormModal from "../../components/EventFormModal";


export default function EventsPage() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents().then(setEvents);
  }, []);

  return (
    <div className="p-4 m-8 space-y-6 ">
      <h1 className="text-2xl font-bold">イベント一覧</h1>

      <div className="flex justify-end">
      <Button className="w-5% bg-blue-600 text-white px-4 py-2 rounded-2xl ">
        <Link href='events/form/'>
        新規イベント登録
        </Link>
      </Button>
      </div>
      <div className="grid grid-cols-4">
        {events.length === 0 ? (
          <p>イベントがありません</p>
        ) : (
          events.map((event) => <EventCard key={event.id} event={event} />)
        )}
      </div>

    </div>
  );
}

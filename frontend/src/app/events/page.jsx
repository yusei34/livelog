"use client";

import { useState, useEffect } from "react";
import { Button } from "@headlessui/react";
import { fetchEvents } from "@/lib/api/fetchEvents";
import Link from "next/link";

import EventListItem from "@/components/EventListItem";
import SearchBar from "../../components/SearchBar";
import Filter from "../../components/Filter";

export default function EventsPage() {
  const [events, setEvents] = useState([]); //取得イベントの配列を保持


  useEffect(() => {
    fetchEvents().then(setEvents);
  }, []);

  return (
    <>
      <div className="p-4 m-8 space-y-6">
        <h1 className="text-2xl font-bold">ライブ一覧</h1>

        <SearchBar className="justify-self-center" />

        <div className="p-2 mt-4 overflow-y-auto transition flex flex-col-reverse rounded-3xl ">
          {events.length === 0 ? (
            <p>イベントがありません</p>
          ) : (
            events.map((event) => (
              <EventListItem key={event.id} event={event} />
            ))
          )}
        </div>
      </div>
    </>
  );
}

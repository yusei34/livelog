"use client";

import { useState, useEffect } from "react";
import { Button } from "@headlessui/react";
import { fetchEvents } from "@/lib/api/fetchEvents";
import Link from "next/link";

import EventCard from "@/components/EventCard";
import EventListItem from "@/components/EventListItem";
import Header from "@/components/Header";
import EventsSearch from "../../components/EventsSearch";
import PopOver from "../../components/PopOver";
import Filter from "../../components/Filter";
import { useRouter, useSearchParams } from "next/navigation";

export default function EventsPage() {
  const [events, setEvents] = useState([]); //取得イベントの配列を保持
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    fetchEvents().then(setEvents);
  }, []);

  return (
    <>
      <Header />
      <div className="p-4 m-8 space-y-6 border">
        <h1 className="text-2xl font-bold">イベント一覧</h1>

        <div className="flex justify-end">
          <Button className="w-5% bg-blue-600 text-white px-4 py-2 rounded-2xl ">
            <Link href="events/form/">新規イベント登録</Link>
          </Button>
        </div>
        <PopOver className="justify-self-center" />

        <div className="overflow-y-auto transition flex flex-col-reverse rounded-3xl border border-green-400">
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

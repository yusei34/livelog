"use client";

import Link from "next/link";
import { Ticket, ChevronRight, JapaneseYen } from "lucide-react";
import { useEffect, useState } from "react";
import EventCard from "./EventCard";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from "@/components/DetailCard";
import { fetchEvents } from "@/lib/api/fetchEvents";

const EventsArea = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents().then((data) => {
      const now = new Date();
      const filtered = data
        .filter((event) => new Date(event.event_date) >= now)
        .sort((a, b) => new Date(a.event_date) - new Date(b.event_date))
        .slice(0, 4);
      setEvents(filtered);
    });
  }, []);


  return (
    <>
      <div className="flex flex-col justify-between">
        <div className="flex justify-between items-center px-8  pb-1.5">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl text-white">
                <Ticket className="h-6 w-6" />
              </div>
              参加予定ライブ
            </h2>
            <p className="text-gray-600">直近の参加予定イベント</p>
          </div>
          <Link
            href="/events"
            className="flex justify-center hover:bg-green-50"
          >
            <span className="text-green-700 inline-block align-bottom">
              すべて見る
            </span>
            <ChevronRight className="fill-green-700 h-6 w-4" />
          </Link>
        </div>
      </div>

      <div className="m-2 pb-8 px-5 ">
        <div className="grid h-[15em] gap-6 grid-cols-4 items-center  m-1">
          {events.length === 0 ? (
            <p>イベントがありません</p>
          ) : (
            events.map((event) => <EventCard key={event.id} event={event} />)
          )}
        </div>
      </div>
    </>
  );
};

export default EventsArea;

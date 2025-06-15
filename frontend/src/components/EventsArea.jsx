"use client";

import Link from "next/link";
import {
  PlusCircle,
  CalendarIcon,
  Music,
  Ticket,
  BarChart3,
  ChevronRight
} from "lucide-react";
import React, { useEffect, useState } from "react";
import EventCard from "./EventCard";
import { fetchEvents } from "@/lib/api/fetchEvents";

const EventsArea = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents(0, 4).then(setEvents);
  }, []);

  return (
    <>
      <div className="flex flex-col justify-between border  border-green-500 rounded-2xl">
        <div className="" >
          <div className="flex justify-between items-center px-8 pt-3 pb-1.5">
            <div className="text-green-500 flex justify-center text-xl font-bold text-primary m-2 ">
              <Ticket className="mr-2 h-7 w-7" />
              参加予定ライブ
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
      </div>
    </>
  );
};

export default EventsArea;

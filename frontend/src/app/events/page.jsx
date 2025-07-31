"use client";

import { useState, useEffect } from "react";
import { Button } from "@headlessui/react";
import { fetchAllEvents } from "@/lib/api/fetchEvents";
import Link from "next/link";

import EventListItem from "@/components/EventListItem";
import SearchBar from "../../components/SearchBar";
import Pagination from "../../components/Pagination";
import Filter from "../../components/Filter";

const PAGE_SIZE = 5;

export default function EventsPage() {
  const [events, setEvents] = useState([]); //取得イベントの配列を保持
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchEvent = async () => {
      const skip = (page - 1) * PAGE_SIZE;
      const res = await fetchAllEvents(skip, PAGE_SIZE);
      setEvents(res);
    };
    fetchEvent();
  }, [page]);

  // const totalPages = Math.ceil(total / PAGE_SIZE);

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

        <Pagination
          page={page}
          // totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>
    </>
  );
}

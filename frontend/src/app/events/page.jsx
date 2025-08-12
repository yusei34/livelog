"use client";

import { useState, useEffect } from "react";
import { fetchAllEvents } from "@/lib/api/fetchEvents";

import EventListItem from "@/components/EventListItem";
import SearchBar from "../../components/SearchBar";
import Pagination from "../../components/Pagination";
import Filter from "../../components/Filter";

const PAGE_SIZE = 5;

export default function EventsPage() {
  const [events, setEvents] = useState([]); //取得イベントの配列を保持
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

useEffect(() => {
  const fetchEvent = async () => {
    const skip = (page - 1) * PAGE_SIZE;
    const res = await fetchAllEvents(skip, PAGE_SIZE);

    const today = new Date();
    today.setHours(0, 0, 0, 0); // 時間をゼロクリア（0:00〜の比較にする）

    // 未来・当日イベント
    const futureEvents = res.data.filter(
      (e) => new Date(e.event_date) >= today
    ).sort((a, b) => {
      // 開催日が早いほうが上
      return new Date(a.event_date) - new Date(b.event_date);
    });

    // 過去イベント
    const pastEvents = res.data.filter(
      (e) => new Date(e.event_date) < today
    ).sort((a, b) => {
      // 新しい順（直近が最初）
      return new Date(b.event_date) - new Date(a.event_date);
    });

    // 結合してセット
    setEvents([...futureEvents, ...pastEvents]);
    setTotal(res.total); // 適宜変更（ページャ仕様による）
  };
  fetchEvent();
}, [page]);

  const totalPages = Math.ceil(total / PAGE_SIZE);

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-100">
        <div className="flex flex-col px-18">
          {/* title */}
          <div className="text-neutral-400 text-2xl font-bold tracking-tight p-4">
            参戦ライブ一覧
          </div>

          <div className="p-8">
            <SearchBar className="justify-self-center" />
          </div>

          <div className="flex flex-col items-center px-32">
            <div className="mx-12 self-start">
              <Pagination
                page={page}
                totalPages={totalPages}
                onPageChange={setPage}
              />
            </div>

            <div className="rounded-xl shadow-xl p-16 m-20 w-6xl border border-gray-400/10">
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
          </div>
        </div>
      </div>
    </>
  );
}

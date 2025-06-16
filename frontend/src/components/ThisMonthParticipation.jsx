"use client";

import React, { useEffect, useState } from "react";
import { fetchAllEvents } from "@/lib/api/fetchEvents";

const ThisMonthParticipation = () => {
    const [counts, setCount] = useState(0);
    const [events, setEvents] = useState([]);
  
    const countThisMonthEvent = async (events, month) => {
      return events.filter(
        (event) => new Date(event.event_date).getMonth() +1 === month
      ).length;
    };
  
    // イベントを取得
    useEffect(() => {
      fetchAllEvents().then(setEvents);
    }, []);
  
    // イベントが取得できたらカウント
    useEffect(() => {
      const now = new Date();
      const countEvents = async () => {
        const count = await countThisMonthEvent(events, now.getMonth()+1);
        setCount(count);
      };
      if (events.length > 0) {
        countEvents();
      }
    }, [events]);

    const nowMonth = new Date();
    const month = nowMonth.getMonth()
  return (
    <div className="flex flex-col border border-green-500 rounded-xl px-[2em] pt-[1em] pb-[4em]">
      <div className="font-bold text-lg text-green-500 pb-[1em]">{`${month + 1}月の参戦数`}</div>
      <div className="self-center font-extrabold text-3xl text-green-600">
        {`${counts}回`}
      </div>
      
    </div>
  );
};

export default ThisMonthParticipation;
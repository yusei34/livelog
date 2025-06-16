"use client";

import React, { useEffect, useState } from "react";
import { fetchAllEvents } from "@/lib/api/fetchEvents";

const ThisYearParticipation = () => {
    const [counts, setCount] = useState(0);
    const [events, setEvents] = useState([]);
  
    const countThisYearEvent = async (events, year) => {
      return events.filter(
        (event) => new Date(event.event_date).getFullYear() === year
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
        const count = await countThisYearEvent(events, now.getFullYear());
        setCount(count);
      };
      if (events.length > 0) {
        countEvents();
      }
    }, [events]);

  return (
    <div className="flex flex-col border border-green-500 rounded-xl">
      <div className="font-bold text-lg text-green-500">今年の参戦数</div>
      <div className="self-center font-extrabold text-2xl text-green-600">
        {`${counts}回`}
      </div>
      
    </div>
  );
};

export default ThisYearParticipation;

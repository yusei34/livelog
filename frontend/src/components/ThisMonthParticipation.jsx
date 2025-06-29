"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from "@/components/DetailCard";
import {
  CalendarIcon,
  Music,
  Ticket,
  BarChart3,
  ChevronRight,
  TrendingUp,
  DollarSign,
  Sparkles,
  Target,
  Award
} from "lucide-react";
import { fetchAllEvents } from "@/lib/api/fetchEvents";

const ThisMonthParticipation = () => {
  const [thisCounts, setThisCount] = useState(0);
  const [lastCounts, setLastCount] = useState(0);
  const [events, setEvents] = useState([]);

  const countThisMonthEvent = async (events, month) => {
    return events.filter(
      (event) => new Date(event.event_date).getMonth() + 1 === month
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
      const thisCount = await countThisMonthEvent(events, now.getMonth() + 1);
      setThisCount(thisCount);
      const lastCount = await countThisMonthEvent(events, now.getMonth());
      setLastCount(lastCount);
    };
    if (events.length > 0) {
      countEvents();
    }
  }, [events]);

  const getMonth = () => {
    const month = new Date();
    const thisMonth = month.getMonth()+1;
    return thisMonth;
  };

  const eventGrowth = thisCounts - lastCounts;



  return (
    <>
      <Card className="h-[15em] group relative overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-500 bg-gradient-to-br from-emerald-50 to-green-100 hover:from-emerald-100 hover:to-green-200">
        <div className="top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-green-500" />
        <CardContent className="p-6 my-4 mx-2 relative">
          <div className="flex items-start justify-between mb-4">
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-600">
                {`今月の参加イベント数<${getMonth()}月>`}
              </p>
              <div className="flex items-baseline gap-2">
                <h3 className="text-3xl font-bold text-gray-900">
                  {thisCounts}
                </h3>
                <span className="text-sm text-gray-500">件</span>
              </div>
            </div>
            <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
              <CalendarIcon className="h-6 w-6 text-white" />
            </div>
          </div>
          <div className="flex items-center gap-2 p-3 bg-white/50 rounded-lg">
            <div
              className={`p-1 rounded-full ${
                eventGrowth >= 0 ? "bg-green-100" : "bg-red-100"
              }`}
            >
              <TrendingUp
                className={`h-3 w-3 ${
                  eventGrowth >= 0
                    ? "text-green-600"
                    : "text-red-600 rotate-180"
                }`}
              />
            </div>
            <span
              className={`text-sm font-medium ${
                eventGrowth >= 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              前月比 {eventGrowth >= 0 ? "+" : ""}
              {eventGrowth}件
            </span>
            <span
              className={`text-xs ${
                eventGrowth >= 0 ? "text-green-500" : "text-red-500"
              }`}
            ></span>
          </div>
        </CardContent>
      </Card>
    </>
    // <div className="flex flex-col border border-green-500 rounded-xl px-[2em] pt-[1em] pb-[4em]">
    //   <div className="font-bold text-lg text-green-500 pb-[1em]">{`${month + 1}月の参戦数`}</div>
    //   <div className="self-center font-extrabold text-3xl text-green-600">
    //     {`${counts}回`}
    //   </div>

    // </div>
  );
};

export default ThisMonthParticipation;

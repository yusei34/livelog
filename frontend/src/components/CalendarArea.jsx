"use client";

import * as React from "react";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/Calendar";

export function CalendarArea() {
  const [date, setDate] = React.useState(new Date());

  return (
    <>
      <div className="border  border-green-500 rounded-2xl">
        <div className="flex justify-start text-green-500 text-xl font-bold m-2 ">
          <CalendarIcon />
          カレンダー
        </div>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border shadow-sm "
          captionLayout="dropdown"
        />
      </div>
    </>
  );
}

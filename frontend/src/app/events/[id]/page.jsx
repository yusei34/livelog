"use client";

import React, { use, useEffect, useState } from "react";
import { fetchEventById } from "@/lib/api/fetchEvents";
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react';
import { Button } from '@headlessui/react'


const EventDetailPage = ({ params }) => {
  const [event, setEvent] = useState(null); // 初期値は null
  const id = params.id;

  useEffect(() => {
    fetchEventById(id).then(setEvent);
  }, [id]);

  // データがまだない場合
  if (!event) return <div>読み込み中...</div>;

  return (
    <>
      <div className="p-4 bg-white">
        <header className="flex gap-5">
        <Button className='border  border-gray-200 rounded data-hover:bg-gray-200 data-hover:data-active:bg-gray-300'>
            <Link href='/events'>
            
            <ArrowLeft className="h-10 w-auto"/>
            </Link>
        </Button>
        <h1 className="text-4xl font-bold">{event.title}</h1>
        </header>
        
        <p className="mt-2">会場: {event.venue}</p>
        <p>開催日: {event.event_date}</p>

        <h2 className="mt-4 font-semibold">出演者</h2>
        <ul className="list-disc list-inside">
          {event.actors.map((actor) => (
            <li key={actor.id}>{actor.name}</li>
          ))}
        </ul>

        <h2 className="mt-4 font-semibold">経費</h2>
        {event.expenses.length === 0 ? (
          <p>なし</p>
        ) : (
          <ul className="list-disc list-inside">
            {event.expenses.map((expense) => (
              <li key={expense.id}>{expense.name}</li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default EventDetailPage;

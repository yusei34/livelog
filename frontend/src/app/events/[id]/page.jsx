"use client";

import React, { use, useEffect, useState } from "react";
import { fetchEventById } from "@/lib/api/fetchEvents";

const EventDetailPage = ({ params }) => {
  const [event, setEvent] = useState(null); // 初期値は null
  const id = params.id;

//   useEffect(() => {
//     fetchEventById(params.id)
//       .then((data) => {
//         setEvent(data); // データをセット
//       })
//       .catch((error) => {
//         console.error("イベント取得失敗:", error);
//       });
//   }, [params.id]);

  useEffect(() => {
    fetchEventById(id)
      .then(setEvent)
      }, [id]);


  // データがまだない場合
  if (!event) return <div>読み込み中...</div>;

  return (
    <>
       <div className="p-4">
      <h1 className="text-2xl font-bold">{event.title}</h1>
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

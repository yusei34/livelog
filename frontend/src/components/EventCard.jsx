import React from 'react'

const EventCard = ({event}) => {
    const date = new Date(event.event_date).toLocaleString("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  return (
    <div className="self-stretch text-center rounded-xl border border-green-500  hover:shadow-md hover:border-2 hover:shadow-lg transition">
        <h2 className="text-[1.2em] font-bold">{event.title}</h2>
        <p className="text-sm ">{date}</p>
        <p className="text-sm">{event.venue}</p>
    </div>
  )
}

export default EventCard
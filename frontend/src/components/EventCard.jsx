import React from 'react'

const EventCard = ({event}) => {
    const date = new Date(event.date).toLocaleString("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  return (
    <div className="max-w-84 text-center rounded-xl border m-4 p-4 shadow-md hover:shadow-lg transition">
        <h2 className="text-xl font-bold">{event.title}</h2>
        <p className="text-sm ">{date}</p>
        <p className="text-sm">{event.venue}</p>
        <p className="text-xs ">{event.actors.length} actors</p>
    </div>
  )
}

export default EventCard
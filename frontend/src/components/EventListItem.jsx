import React from 'react'

const EventListItem = ({event}) => {
    const date = new Date(event.event_date).toLocaleString("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  return (
    <div className=''>
        <div className="flex  flex-col justify-between items-center border-b pb-4 rounded-xl border m-4 p-4 shadow-md hover:shadow-lg transition">
        <h2 className="text-xl font-bold">{event.title}</h2>
        <div className='flex item-center'>
        <p className="text-sm ">{date}</p>
        <p className="text-sm">{event.venue}</p>
        </div>
    </div>
    </div>
    
  )
}
export default EventListItem
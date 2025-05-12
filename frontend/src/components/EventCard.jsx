import React from 'react'

const EventCard = ({event}) => {
    const date = new Date(event.date).toLocaleString();
  return (
    <div>
        <h2>{event.title}</h2>
        <p>{date}</p>
        <p>{event.venue}</p>
        <p>{event.actors.length} actors</p>
    </div>
  )
}

export default EventCard
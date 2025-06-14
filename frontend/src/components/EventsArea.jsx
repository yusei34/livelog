'use client';
import React, { useEffect, useState } from 'react'

import EventCard from './EventCard';

import {fetchEvents} from '@/lib/api/fetchEvents'

const EventsArea = () => {

    const [events, setEvents] = useState([]);

    useEffect(() => {

        fetchEvents().then(setEvents);

      }, []);


  return (
    <>
         {events.length === 0 ? (
        <p>イベントがありません</p>
      ) : (
        events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))
      )}
    </>
   
  )
}

export default EventsArea
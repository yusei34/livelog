import React from "react";
import { MapPin, Calendar, ChevronRight } from "lucide-react";

const EventListItem = ({ event }) => {
  const date = new Date(event.event_date).toLocaleString("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  });
  return (
    <>
      <div className="flex items-center justify-between  border-b pb-4 m-2 hover:bg-muted/50 p-2 rounded-md transition-colors">
        <div className="space-y-1">
          <h2 className="font-medium text-lg">{event.title}</h2>
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="h-3.5 w-3.5 mr-1" />
            <span>{date}</span>
            <span className="mx-2">•</span>
            <MapPin className="h-3.5 w-3.5 mr-1" />
            <span>{event.venue}</span>
          </div>
        </div>
        <ChevronRight className="h-5 w-5 text-muted-foreground" />
      </div>
    </>
  );
};
export default EventListItem;

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
      <div className="flex items-center justify-between rounded-b-lg border-b border-gray-200 p-4  hover:bg-gray-50 hover:transition-colors hover:shadow-md">
        <div className="space-y-1">
          <div className="px-2">
            <h2 className="font-medium text-lg">{event.title}</h2>
          </div>
          <div className="px-2 flex items-center text-sm text-gray-700 text-muted-foreground">
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

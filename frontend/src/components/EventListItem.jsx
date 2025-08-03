import React from "react";
import Link from "next/link";
import { MapPin, Calendar, ChevronRight } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from "@/components/DetailCard";

const EventListItem = ({ event }) => {
  const date = new Date(event.event_date).toLocaleString("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  });
  return (
    // className="flex items-center justify-between rounded-b-lg border-b border-gray-200 p-4 m-12  hover:bg-gray-50 hover:transition-colors hover:shadow-md"
    <>
        <Link href={`/events/${event.id}`} >
          <Card className="border-none space-y-1 flex items-center justify-between rounded-b-lg border-b bg-gradient-to-br from-green-50 to-emerald-300 border-gray-200 p-8 mx-12 my-2 hover:bg-gray-50 hover:transition-colors hover:shadow-md">
            <CardTitle className="px-2">
              <h2 className="font-medium text-lg">{event.title}</h2>
            </CardTitle>
            <CardContent className="px-2 flex items-center text-sm text-gray-700 text-muted-foreground">
              <Calendar className="h-3.5 w-3.5 mr-1" />
              <span>{date}</span>
              <span className="mx-2">•</span>
              <MapPin className="h-3.5 w-3.5 mr-1" />
              <span>{event.venue}</span>
            </CardContent>
          </Card>
          {/* <ChevronRight className="h-5 w-5 text-muted-foreground" /> */}
        </Link>
    </>
  );
};
export default EventListItem;

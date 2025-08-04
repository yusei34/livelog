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
 
    <>
      <Link href={`/events/${event.id}`}>
        <Card className="shadow-xl group border-gray-300 rounded-lg p-8 mx-12 my-2 hover:border-green-300   transform transition-all duration-300 hover:scale-[1.02]">
          <CardContent className="relative space-y-4">
            <div className="text-2xl font-bold text-gray-900 group-hover:text-green-600 transition-colors duration-300">
              <h3>{event.title}</h3>
            </div>

            <div className="flex items-center gap-3 text-gray-600">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
                  <Calendar className="h-4 w-4 text-green-600" />
                </div>
                <span className="text-xl font-medium">{date}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 text-gray-600">
              <div className="p-1.5 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors">
                <MapPin className="h-4 w-4 text-purple-600" />
              </div>
              <span className="text-xl font-medium">{event.venue}</span>
            </div>

            <div className="flex justify-end">
              <div className="p-2 bg-gray-100 rounded-full group-hover:bg-green-500 group-hover:text-white transition-all duration-300 transform group-hover:scale-110">
                <ChevronRight className="h-4 w-4" />
              </div>
            </div>

          </CardContent>
        </Card>
      </Link>
    </>
  );
};
export default EventListItem;

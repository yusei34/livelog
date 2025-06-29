import React from "react";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from "@/components/DetailCard";
import { Ticket, ChevronRight, Calendar, MapPin, Music2 } from "lucide-react";

const EventCard = ({ event }) => {
  const date = new Date(event.event_date).toLocaleString("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  });
  return (
    <>
      <Link href={`/events/${event.id}`}>
        <Card className="group relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-gradient-to-br from-white to-gray-50 hover:from-green-50 hover:to-emerald-50 transform hover:scale-105">
          {/* Background Pattern */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-400/10 to-emerald-500/10 rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-700"></div>

          {/* Accent Line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 to-emerald-500"></div>

          <CardContent className="p-6 relative">
            <div className="space-y-4 pt-4">
              {/* Event Title */}
              {/* <CardTitle className="text-xl inline-flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-green-200 to-emerald-300 text-gray-700 rounded-lg shadow-sm
              ">
                {event.title}
              </CardTitle> */}
              <CardTitle className="py-6 mr-8 text-1.5xl font-bold text-gray-900 bg-gradient-to-b  group-hover:text-green-600 transition-colors duration-300">
                {event.title}
              </CardTitle>

              {/* Event Details */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-gray-600 group-hover:text-green-500 transition-colors">
                  <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-green-100 transition-colors">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <span className="font-medium">{event.venue}</span>
                </div>

                {/* Date Badge */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-gray-600 group-hover:text-green-500 transition-colors">
                    <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-green-100 transition-colors">
                      <Calendar className="h-4 w-4" />
                    </div>
                    <span className="font-medium">{date}</span>
                  </div>
                </div>

                {/* <div className="flex items-start gap-3 text-gray-600 group-hover:text-gray-700 transition-colors">
                  <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-green-100 transition-colors mt-0.5">
                    <Music2 className="h-4 w-4" />
                  </div>
                  {/* <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900 mb-1">
                      出演アーティスト
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {res.actors.map((actor) => (
                        <span
                          key={actor.id}
                          className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md group-hover:bg-green-100 group-hover:text-green-700 transition-colors"
                        >
                          {actor.name}
                        </span>
                      ))}
                    </div>
                  </div> 
                </div> */}
              </div>

              {/* Hover Effect Arrow */}
              <div className="flex justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="p-2 bg-green-500 text-white rounded-full transform translate-x-2 group-hover:translate-x-0 transition-transform duration-300">
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
      {/* <div className="self-stretch text-center rounded-xl border border-green-500  hover:shadow-md hover:border-2 hover:shadow-lg transition">
        <Link href={`/events/${event.id}`}>
          <h2 className="text-[1.2em] font-bold">{event.title}</h2>
          <p className="text-sm ">{date}</p>
          <p className="text-sm">{event.venue}</p>
        </Link>
      </div> */}
    </>
  );
};

export default EventCard;

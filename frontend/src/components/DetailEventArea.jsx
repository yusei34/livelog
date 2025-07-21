"use client";

import { useEffect, useState } from "react";
import { dateFormat } from "@/lib/utils";
import { Calendar, MapPinIcon } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent
} from "@/components/DetailCard";

const DetailEventArea = ({ initialEvent }) => {
  const [event, setEvent] = useState(initialEvent);
  const [date, setDate] = useState("");

  useEffect(() => {
    const format = async () => {
      const date = new Date(event.event_date);
      await setDate(dateFormat(date));
    };
    format();
  }, [event]);

  return (
    <Card className=" border-0 shadow-xl bg-gradient-to-br from-white to-blue-50/30 overflow-hidden">
      <CardHeader className="pb-4">
        <CardContent className="pl-12 pt-4 ">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
                <div className="p-2 bg-blue-500 rounded-lg text-white">
                  <Calendar className="h-5 w-5" />
                </div>
                <CardTitle className="text-xl pr-3">開催日</CardTitle>
                <div>
                  <div className="font-semibold text-gray-900">{date}</div>
                </div>
              </div>
            </div>
            <div className="space-y-4 ">
              <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-purple-50 to-violet-50 rounded-xl">
                <div className="p-2 bg-purple-500 rounded-lg text-white">
                  <MapPinIcon className="h-5 w-5" />
                </div>
                <CardTitle className="text-xl pr-3">会場</CardTitle>
                <div>
                  <div className="font-semibold text-gray-900">
                    {event.venue}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </CardHeader>
    </Card>
  );
};

export default DetailEventArea;

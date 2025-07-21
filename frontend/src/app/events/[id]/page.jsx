// "use client";
import { fetchEventById } from "@/lib/api/fetchEvents";
import { deleteExpense } from "@/lib/api/postExpense";

import RegisterExpense from "@/components/RegisterExpense";
import EventModalController from "../../../components/EventEditModal/EventModalController";
import ExpenseArea from "../../../components/ExpenseArea";
import DetailEventArea from "../../../components/DetailEventArea";
import DetailEventActor from "../../../components/DetailEventActor";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  MapPinIcon,
  Guitar,
  Music,
  Wallet,
  Edit,
  PlusCircle
} from "lucide-react";
import { Button } from "@headlessui/react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from "@/components/DetailCard";
import { toast } from "sonner";

const EventDetailPage = async ({ params }) => {
  // fetchがうまくいかない
  const id = params.id
  const event = await fetchEventById(id);

  // データを取得してstateを更新する関数
  // const fetchAndUpdateEvent = async () => {
  //   const event = await fetchEventById(id);
  //   return event;
  // };


  // useEffect(() => {
  //   fetchAndUpdateEvent(); // 初回読み込み
  // }, [id]);

 

  // データがまだない場合
  if (!event) return <div>読み込み中...</div>;

  return (
    <>
      <div className=" min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600">
          <div className="relative py-8 text-white">
            <div className="flex justify-between items-center gap-4 mb-6 px-16">
              <Link href="/events">
                <Button className="bg-white/20 hover:bg-white/30 text-white border-white/20 rounded">
                  <ArrowLeft className="h-8 w-8" />
                </Button>
              </Link>
              <div className="flex-1">
                <h1 className="text-4xl font-bold tracking-tight">
                  {event.title}
                </h1>
              </div>
              <div className="flex gap-2">
                <EventModalController
                  initialData={event}
                  // onUpdateSuccess={fetchAndUpdateEvent}
                />
              </div>
            </div>
          </div>
        </div>

        <main className=" py-8 px-20">
          {/* 開催日 */}
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-6">
              <DetailEventArea initialEvent={event}/>
              {/* artist area */}
              <DetailEventActor event={event}/>
            </div>

            {/* expense */}
            <ExpenseArea event={event}/>
          </div>
        </main>
      </div>
    </>
  );
};

export default EventDetailPage;

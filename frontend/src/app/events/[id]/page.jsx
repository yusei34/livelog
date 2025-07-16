"use client";

import { useEffect, useState } from "react";
import { fetchEventById } from "@/lib/api/fetchEvents";
import { deleteExpense } from "@/lib/api/postExpense";
import { dateFormat } from "@/lib/utils";
import RegisterExpense from "@/components/RegisterExpense";
import EventModalController from "../../../components/EventEditModal/EventModalController";
import ExpenseArea from "../../../components/ExpenseArea";
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

const EventDetailPage = ({ params }) => {
  const [event, setEvent] = useState(null);
  const [date, setDate] = useState("");
  const id = params.id;

  // データを取得してstateを更新する関数
  const fetchAndUpdateEvent = async () => {
    const updatedEvent = await fetchEventById(id);
    setEvent(updatedEvent);
  };

  //Delete expense
  const onDeleteExpense = async (id) => {
    try {
      await deleteExpense(id)
      toast.success('削除しました')
    } catch (error) {
      toast.error('削除に失敗しました')
    }
  }

  useEffect(() => {
    fetchAndUpdateEvent(); // 初回読み込み
  }, [id]);

  useEffect(() => {
    const format = async () => {
      const date = new Date(event.event_date);
      await setDate(dateFormat(date));
    };
    format();
  }, [event]);

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
                  onUpdateSuccess={fetchAndUpdateEvent}
                />
              </div>
            </div>
          </div>
        </div>

        <main className=" py-8 px-20">
          {/* 開催日 */}
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-6">
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
                            <div className="font-semibold text-gray-900">
                              {date}
                            </div>
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
              {/* artist area */}
              <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-blue-50/30 overflow-hidden">
                <CardHeader className="grid gap-4 p-4 pt-2">
                  <div className="flex items-center gap-3 p-4  rounded-xl">
                    <div className="p-2 bg-gradient-to-r from-orange-700 to-orange-500 rounded-lg text-white">
                      <Music className="h-5 w-5" />
                    </div>
                    <CardTitle className="text-2xl font-semibold">
                      出演アーティスト
                    </CardTitle>
                  </div>
                  <CardContent className="grid grid-cols-1 gap-3 ">
                    {event.actors.length === 0 ? (
                      <p>アーティストの登録がありません</p>
                    ) : (
                      event.actors.map((actor) => (
                        // <Link  key={artist.id} href={`/artists/${artist.id}`}>
                        <div
                          key={actor.id}
                          className="flex items-center gap-3 p-4 bg-gradient-to-r from-orange-100 to-red-100 hover:from-orange-200 hover:to-red-200  transition-all duration-300 transform hover:scale-105 rounded-xl"
                        >
                          <div className="p-2 bg-orange-500 rounded-lg text-white">
                            <Guitar className="h-5 w-5" />
                          </div>
                          <div>
                            <CardTitle className="text-xl pr-3">
                              {actor.name}
                            </CardTitle>
                          </div>
                        </div>
                        // </Link>
                      ))
                    )}
                  </CardContent>
                </CardHeader>
              </Card>
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

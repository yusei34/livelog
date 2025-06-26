"use client";

import React, { use, useEffect, useState } from "react";
import { fetchEventById } from "@/lib/api/fetchEvents";
import { dateFormat } from "@/lib/utils";
import RegisterExpense from '@/components/RegisterExpense';
import OpenModalButton from '@/components/old/OpenModalButton';
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

const EventDetailPage = ({ params }) => {
  const [event, setEvent] = useState(null);
  const [date, setDate] = useState("");
  const id = params.id;

  useEffect(() => {
    fetchEventById(id).then(setEvent);
  }, [id]);

  useEffect(() => {
    const format = async () => {
      const date = new Date(event.event_date);
      await setDate(dateFormat(date));
    };
    format();
  }, [event]);

  console.log(date);

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
                <Button className="bg-white/20 hover:bg-white/30 text-white border-white/20 rounded">
                  <Edit className="h-8 w-8" />
                </Button>
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

            <div className="space-y-6">
              <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-green-50/30 overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 to-emerald-500"></div>
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-xl flex items-center gap-3">
                        <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl text-white">
                          <Wallet className="h-5 w-5" />
                        </div>
                        支出費用
                      </CardTitle>
                      <CardDescription className="mt-2">
                        {event.expenses.length >= 1 && (
                          <span className="text-2xl font-bold text-green-600">
                            合計:¥
                            {event.expenses
                              .reduce((sum, expense) => sum + expense.amount, 0)
                              .toLocaleString()}
                          </span>
                        )}
                      </CardDescription>
                    </div>
                     <RegisterExpense event_id={event.id}/>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {event.expenses.length === 0 ? (
                      <p>支出なし</p>
                    ) : (
                      event.expenses.map((expense) => (
                        <div
                          key={expense.id}
                          className="flex justify-between items-center p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl hover:from-green-100 hover:to-emerald-100 transition-colors group"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-15 h-10 bg-gradient-to-r from-green-400 to-emerald-500 rounded-lg flex items-center justify-center text-white font-bold text-[70%]">
                              {expense.category}
                            </div>
                            <span className="font-medium text-gray-900">
                              {expense.item_name}
                            </span>
                          </div>
                          <span className="font-bold text-green-600 text-lg">
                            ¥{expense.amount.toLocaleString()}
                          </span>
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

          </div>
        </main>
      </div>
    </>
  );
};

export default EventDetailPage;

"use client";

import React, { use, useEffect, useState } from "react";
import { fetchEventById } from "@/lib/api/fetchEvents";
import { dateFormat } from "@/lib/utils";
import Link from "next/link";
import { ArrowLeft, Calendar, MapPinIcon } from "lucide-react";
import { Button } from "@headlessui/react";
import {Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter} from "@/components/DetailCard"

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
      <div className="px-30 pt-2 mx-60 mt-4 grid grid-cols-1 gap-6">
        <header className="col-span-2 flex gap-5 p-2 my-2 mb-5">
          <Button className="self-end h-10 rounded data-hover:bg-gray-200 data-hover:data-active:bg-gray-300">
            <Link href="/events">
              <ArrowLeft className="h-10 w-auto" />
            </Link>
          </Button>
          <h1 className="text-5xl font-bold">{event.title}</h1>
        </header>

        <main className="grid grid-cols-2 gap-5">
          {/* 開催日 */}
          <Card className="bg-green-100 h-[10em] w-auto px-5 border border-green-300 rounded-xl">
            {/*header*/}
            <CardHeader className="grid gap-4 p-4 pt-2">
              <CardTitle className="text-2xl font-semibold ">開催日</CardTitle>
              <CardContent className="flex pl-12 gap-4 ">
                <Calendar className="size-6 self-center" />
                <div className="text-xl text-center font-bold">{date}</div>
              </CardContent>
            </CardHeader>
          </Card>
          {/*開場*/}
          <Card className="bg-green-100 h-[10em] w-auto px-5 border border-green-300 rounded-xl">
            <CardHeader className="grid gap-4 p-4 pt-2">
              <CardTitle className="text-2xl font-semibold">開場</CardTitle>
              <CardContent className="flex pl-12 gap-4 ">
                <MapPinIcon className="size-6 self-center" />
                <div className="text-xl text-center font-bold">
                  {event.venue}
                </div>
              </CardContent>
            </CardHeader>
          </Card>

          {/* artist area */}
          <Card className="col-span-2 bg-green-100 h-[10em] w-auto px-5 border border-green-300 rounded-xl">
            <CardHeader className="grid gap-4 p-4 pt-2">
              <CardTitle className="text-2xl font-semibold">出演アーティスト</CardTitle>
              {/* <Button className="h-[3em] text-white font-bold  border  p-3  border-green-100 bg-green-500 rounded-xl">
                アーティスト登録
              </Button> */}
              <CardContent className="grid grid-cols-1 ">
                {event.actors.length === 0 ? (
                  <p>アーティストの登録がありません</p>
                ) : (
                  event.actors.map((actor) => (
                    <div
                      key={actor.id}
                      className="pl-12 text-xl font-sans font-semibold"
                    >
                      {actor.name}
                    </div>
                  ))
                )}
              </CardContent>
            </CardHeader>
          </Card>
          {/* expense */}
          <div className="col-span-2 bg-green-100 h-[10em] w-auto px-5 border border-green-300 rounded-xl">
            <div className="flex justify-between items-center p-4 pt-2">
              <div className="text-3xl font-semibold">費用</div>
            </div>
            {event.expenses.length === 0 ? (
              <p>なし</p>
            ) : (
              <ul className="list-disc list-inside">
                {event.expenses.map((expense) => (
                  <li key={expense.id}>{expense.name}</li>
                ))}
              </ul>
            )}
          </div>
          <Card>
            <CardHeader>
              <CardTitle>カードタイトル</CardTitle>
              <CardDescription>これは説明文です。</CardDescription>
            </CardHeader>
            <CardContent>メインの内容がここに入ります。</CardContent>
            <CardFooter>
              <button>アクション</button>
            </CardFooter>
          </Card>
        </main>
      </div>
    </>
  );
};

export default EventDetailPage;

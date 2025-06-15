import Header from "@/components/Header";
import EventsArea from "@/components/EventsArea";
import { CalendarArea } from "@/components/CalendarArea";
import { Button } from "@headlessui/react";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Header />

      <main className="grid grid-cols-2 gap-4 border m-8 p-6">
        <div className="col-span-2 flex justify-end m-2 p-2 ">
          <Button className=" bg-green-600 text-white font-bold px-4 py-2 rounded-xl hover:shadow-lg">
            <Link href="events/form/">新規イベント登録</Link>
          </Button>
        </div>

        <div className="col-span-2">
          <EventsArea />
        </div>

        <div>
          <CalendarArea />
        </div>

        <div className="border"></div>

      </main>
    </>
  );
}

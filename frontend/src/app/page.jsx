import Header from "@/components/Header";
import EventsArea from "@/components/EventsArea";
import ThisYearParticipation from "../components/ThisYearParticipation";
import { Button } from "@headlessui/react";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Header />

      <main className="grid grid-cols-4 gap-4 border m-8 p-6">
        <div className="col-span-4 flex justify-end m-2 p-2 ">
          <Button className=" bg-green-600 text-white font-bold px-4 py-2 rounded-xl hover:shadow-lg">
            <Link href="events/form/">新規イベント登録</Link>
          </Button>
        </div>

        <div className="col-span-4">
          <EventsArea />
        </div>
          
        <div>
        <ThisYearParticipation /> 
        </div>

        <div>
          <div className="border">今年の総支出</div>
        </div>
        <div>
          <div className="border">今月の参戦数</div>
        </div>
        <div>
          <div className="border">今月の支出</div>
        </div>

       

      </main>
    </>
  );
}

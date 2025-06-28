import RegisterEvent from "../components/RegisterEvent";
import EventsArea from "@/components/EventsArea";
import ThisYearParticipation from "../components/ThisYearParticipation";
import ThisMonthParticipation from "../components/ThisMonthParticipation";
import { Button } from "@headlessui/react";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <main className="grid grid-cols-4 gap-4 border m-8 p-6">
        <div className="col-span-4 flex justify-end m-2 p-2 ">
          <Button className=" bg-green-600 text-white font-bold px-4 py-2 rounded-xl hover:shadow-lg">
            <Link href="events/form/">新規イベント登録</Link>
          </Button>
          
          <RegisterEvent />
        </div>

        <div className="col-span-4">
          <EventsArea />
        </div>

        <div className="col-span-2">
          <ThisYearParticipation />
        </div>

        <div className="col-span-2">
          <div className="border h-42 rounded-xl">今年の総支出</div>
        </div>
        <div className="col-span-2">
          <ThisMonthParticipation />
        </div>
        <div className="col-span-2">
          <div className="border  h-42 rounded-xl">今月の支出</div>
        </div>
      </main>
    </>
  );
}

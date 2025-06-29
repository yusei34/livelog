import RegisterEvent from "../components/RegisterEvent";
import EventsArea from "@/components/EventsArea";
import ThisYearParticipation from "../components/ThisYearParticipation";
import ThisMonthParticipation from "../components/ThisMonthParticipation";
import { Button } from "@headlessui/react";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <main className="grid grid-cols-4 gap-4 m-6 p-4">
        <div className="col-span-4 flex justify-end">
          <Button className=" bg-green-600 text-white font-bold px-4 py-2 rounded-xl hover:shadow-lg">
            <Link href="events/form/">新規イベント登録</Link>
          </Button>

          <RegisterEvent />
        </div>

        <div className="col-span-4">
          <EventsArea />
        </div>
        <div className="col-span-4 h-[15em] grid grid-cols-4 gap-6 items-center  px-8  pb-1.5">
          <div className="">
            <ThisYearParticipation />
          </div>

          <div className="">
            <ThisMonthParticipation />
          </div>
          
          <div className="">
            <div className="border h-42 rounded-xl">今年の総支出</div>
          </div>
          <div className="">
            <div className="border  h-42 rounded-xl">今月の支出</div>
          </div>
        </div>
      </main>
    </>
  );
}

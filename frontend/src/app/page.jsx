import RegisterEvent from "../components/RegisterEvent";
import EventsArea from "@/components/EventsArea";
import DashBoardArea from "../components/DashBoardArea";
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
        <div className="col-span-4">
          <DashBoardArea />
        </div>

        
      </main>
    </>
  );
}

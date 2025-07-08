import EventModalController from "../components/EventRegisterModal/EventModalController";
import EventsArea from "@/components/EventsArea";
import DashBoardArea from "../components/DashBoardArea";



export default function Home() {
  return (
    <>
      <main className="grid grid-cols-4 gap-4 m-6 p-4">
        <div className="col-span-4 flex justify-end">
          <EventModalController />
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

"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";

export default function EventFormPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [venue, setVenue] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [actorIds, setActorIds] = useState([]);
  const [actorNames, setActorNames] = useState([]);

  useEffect(() => {
    const ids = searchParams.get("actor_ids");
    const names = searchParams.get("actor_names");

    if (ids && names) {
      try {
        const parsedIds = JSON.parse(ids);
        const parsedNames = JSON.parse(names);
        setActorIds(parsedIds);
        setActorNames(parsedNames);
      } catch (err) {
        console.error("クエリパラメータのパースに失敗しました", err);
      }
    }
  }, [searchParams]);

  const handleRemoveActor = (index) => {
    setActorIds((prev) => prev.filter((_, i) => i !== index));
    setActorNames((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://127.0.0.1:8000/events", {
        event: {
          title,
          venue,
          event_date: eventDate
        },
        actor_ids: actorIds
      });
      alert("イベントを登録しました");
      router.push("/events");
    } catch (err) {
      alert("登録に失敗しました");
      console.error(err);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">イベント登録</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold">タイトル</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block font-semibold">会場</label>
          <input
            type="text"
            value={venue}
            onChange={(e) => setVenue(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block font-semibold">開催日</label>
          <input
            type="date"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block font-semibold">出演アーティスト</label>
          <div>
            <button type="button">
              <Link href="../actors/select/" className="block font-semibold">
                追加
              </Link>
            </button>
            <Link href="../actors/select/" className="block font-semibold">
              追加
            </Link>
          </div>

          <ul className="space-y-2">
            {actorNames.map((name, index) => (
              <li
                key={index}
                className="flex justify-between items-center border p-2 rounded"
              >
                {name}
                <button
                  type="button"
                  onClick={() => handleRemoveActor(index)}
                  className="text-red-500"
                >
                  削除
                </button>
              </li>
            ))}
          </ul>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          登録する
        </button>
      </form>
    </div>
  );
}

// "use client";

// import EventFormModal from "../../../components/EventFormModal";
// import { useSearchParams } from 'next/navigation';

// export default function EventForm() {
//   const searchParams = useSearchParams();

//   const isOpen = searchParams.get("isOpen") === "true";

//   const actorIds = searchParams.get("actor_ids");
//   const actorNames = searchParams.get("actor_names");

//   const parsedIds = actorIds ? JSON.parse(decodeURIComponent(actorIds)) : [];
//   const parsedNames = actorNames
//     ? JSON.parse(decodeURIComponent(actorNames))
//     : [];

//   return (
//     <EventFormModal
//       isOpen={isOpen}
//       initialActorIds={parsedIds}
//       initialActorNames={parsedNames}
//     />
//   );
// }

// import { useFormState, useFormStatus } from "react-dom";
// import React, { useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { registerEvent } from "./action";
// import { fetchActors } from "@/lib/fetchActors";
// import SubmitButton from "@/components/SubmitButton";

// export default function NewEventPage() {
//   const router = useRouter();
//   const [formState, formAction] = useFormState(registerEvent, {
//     message: "",
//     success: false
//   });
//   const [actors, setActors] = React.useState([]);

//   useEffect(() => {
//     fetchActors().then(setActors).catch(console.error);
//   }, []);

//   // 成功時リダイレクト
//   useEffect(() => {
//     if (formState.success) {
//       router.push("/events");
//     }
//   }, [formState, router]);

//   return (
//     <div className="p-6 max-w-md mx-auto space-y-4">
//       <h1 className="text-2xl font-bold">イベント登録</h1>
//       {formState.message && <p className="text-red-500">{formState.message}</p>}
//       <form action={formAction} className="space-y-4">
//         <input
//           type="text"
//           name="title"
//           placeholder="イベント名"
//           className="w-full border p-2 rounded"
//         />
//         <input
//           type="text"
//           name="venue"
//           placeholder="会場"
//           className="w-full border p-2 rounded"
//         />
//         <input
//           type="date"
//           name="event_date"
//           className="w-full border p-2 rounded"
//         />

//         <div className="space-y-2">
//           <p>出演アクター：</p>
//           {actors.map((actor) => (
//             <label key={actor.id} className="block">
//               <input
//                 type="checkbox"
//                 name="actor_ids"
//                 value={actor.id}
//                 className="mr-2"
//               />
//               {actor.name}
//             </label>
//           ))}
//         </div>

//         <SubmitButton />
//       </form>
//     </div>
//   );
// }

// "use client";
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

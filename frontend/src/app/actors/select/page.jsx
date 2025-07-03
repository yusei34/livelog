"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { fetchActors } from "@/lib/api/fetchActors";
import { Button } from "@headlessui/react";

export default function ActorSelectPage() {
  const [query, setQuery] = useState("");
  const [actors, setActors] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [selected, setSelected] = useState([]);
  const router = useRouter();
  const searchParams = useSearchParams();

  // 1. 初期化: 役者一覧取得
  useEffect(() => {
    const loadActors = async () => {
      const data = await fetchActors();
      setActors(data);
      setFiltered(data);
    };
    loadActors();
  }, []);

  // 2. 検索フィルタ
  useEffect(() => {
    const q = query.trim().toLowerCase();
    setFiltered(actors.filter((actor) => actor.name.toLowerCase().includes(q)));
  }, [query, actors]);

  // 3. クエリまたはlocalStorageから選択状態を復元
  useEffect(() => {
    const ids = searchParams.get("actor_ids");
    const names = searchParams.get("actor_names");
    if (ids && names) {
      try {
        const parsedIds = JSON.parse(ids);
        const parsedNames = JSON.parse(names);
        // actorsがまだ取得できていない場合もあるので、IDとnameでselectedを復元
        setSelected(
          parsedIds.map((id, idx) => ({
            id,
            name: parsedNames[idx] || ""
          }))
        );
      } catch (err) {
        // 無視
      }
    } else {
      // localStorageから復元（必要なら）
      const saved = localStorage.getItem("selectedActors");
      if (saved) {
        setSelected(JSON.parse(saved));
      }
    }
  }, [searchParams]);

  // 4. 選択状態をlocalStorageに保存
  useEffect(() => {
    localStorage.setItem("selectedActors", JSON.stringify(selected));
  }, [selected]);

  // 5. 選択切替
  const toggleActor = (actor) => {
    setSelected((prev) =>
      prev.find((a) => a.id === actor.id)
        ? prev.filter((a) => a.id !== actor.id)
        : [...prev, actor]
    );
  };

  // 6. 削除
  const removeActor = (id) => {
    setSelected((prev) => prev.filter((a) => a.id !== id));
  };

  // 7. 確定→イベント登録フォームに戻る
  const handleConfirm = () => {
    const actor_ids = selected.map((a) => a.id);
    const actor_names = selected.map((a) => a.name);
    // localStorageにも保存（RegisterEvent側で復元用）
    localStorage.setItem("selectedActors", JSON.stringify(selected));
    router.push(
      `/events/form?actor_ids=${encodeURIComponent(
        JSON.stringify(actor_ids)
      )}&actor_names=${encodeURIComponent(JSON.stringify(actor_names))}`
    );
  };

  return (
    <div className="p-6 max-w-xl mx-auto space-y-4">
      <h1 className="text-xl font-bold">アクター検索・選択</h1>

      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="アクター名を検索"
        className="w-full border px-3 py-2 rounded"
        aria-label="アクター名検索"
      />

      <ul className="space-y-2">
        {filtered.map((actor) => (
          <li
            key={actor.id}
            onClick={() => toggleActor(actor)}
            className={`border p-2 rounded cursor-pointer ${
              selected.find((a) => a.id === actor.id)
                ? "bg-blue-200"
                : "hover:bg-gray-100"
            }`}
            aria-selected={!!selected.find((a) => a.id === actor.id)}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") toggleActor(actor);
            }}
          >
            {actor.name}
          </li>
        ))}
      </ul>

      <h2 className="text-lg font-semibold mt-6">選択中のアクター</h2>
      <ul className="space-y-2">
        {selected.map((actor) => (
          <li
            key={actor.id}
            className="flex justify-between items-center border p-2 rounded"
          >
            {actor.name}
            <button
              onClick={() => removeActor(actor.id)}
              className="text-red-500"
              type="button"
            >
              削除
            </button>
          </li>
        ))}
      </ul>

      <Button
        onClick={handleConfirm}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
        type="button"
        disabled={selected.length === 0}
      >
        選択完了
      </Button>
    </div>
  );
}

// 'use client';

// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { fetchActors } from '@/lib/api/fetchActors';
// import RegisterEvent from '../../../components/RegisterEvent';

// export default function ActorSelectPage() {
//   const [query, setQuery] = useState('');
//   const [actors, setActors] = useState([]);
//   const [filtered, setFiltered] = useState([]);
//   const [selected, setSelected] = useState([]);
//   const router = useRouter();

//   useEffect(() => {
//     const loadActors = async () => {
//       const data = await fetchActors();
//       setActors(data);
//       setFiltered(data);
//     };
//     loadActors();
//   }, []);

//   useEffect(() => {
//     const q = query.toLowerCase();
//     const result = actors.filter((actor) =>
//       actor.name.toLowerCase().includes(q)
//     );
//     setFiltered(result);
//   }, [query, actors]);

//   const toggleActor = (actor) => {
//     const exists = selected.find((a) => a.id === actor.id);
//     if (exists) {
//       setSelected((prev) => prev.filter((a) => a.id !== actor.id));
//     } else {
//       setSelected((prev) => [...prev, actor]);
//     }
//   };

//   const removeActor = (id) => {
//     setSelected((prev) => prev.filter((a) => a.id !== id));
//   };

//   const handleConfirm = () => {
//     const actor_ids = selected.map((a) => a.id);
//     const actor_names = selected.map((a) => a.name);
//     router.push(
//       `/events/form?actor_ids=${encodeURIComponent(JSON.stringify(actor_ids))}&actor_names=${encodeURIComponent(JSON.stringify(actor_names))}`
//     );
//   };

//   return (
//     <div className="p-6 max-w-xl mx-auto space-y-4">
//       <h1 className="text-xl font-bold">アクター検索・選択</h1>

//       <input
//         type="text"
//         value={query}
//         onChange={(e) => setQuery(e.target.value)}
//         placeholder="アクター名を検索"
//         className="w-full border px-3 py-2 rounded"
//       />

//       <ul className="space-y-2">
//         {filtered.map((actor) => (
//           <li
//             key={actor.id}
//             onClick={() => toggleActor(actor)}
//             className={`border p-2 rounded cursor-pointer ${
//               selected.find((a) => a.id === actor.id)
//                 ? 'bg-blue-200'
//                 : 'hover:bg-gray-100'
//             }`}
//           >
//             {actor.name}
//           </li>
//         ))}
//       </ul>

//       <h2 className="text-lg font-semibold mt-6">選択中のアクター</h2>
//       <ul className="space-y-2">
//         {selected.map((actor) => (
//           <li
//             key={actor.id}
//             className="flex justify-between items-center border p-2 rounded"
//           >
//             {actor.name}
//             <button
//               onClick={() => removeActor(actor.id)}
//               className="text-red-500"
//             >
//               削除
//             </button>
//           </li>
//         ))}
//       </ul>

//       <button
//         onClick={handleConfirm}
//         className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
//       >
//         選択完了
//       </button>
//     </div>
//   );
// }

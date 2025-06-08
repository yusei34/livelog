import React from "react";
import { useEffect, useState, useRef, useCallback } from "react";
import Link from "next/link";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { fetchQueryEvents } from "@/lib/api/fetchEvents";

const PopOver = () => {
  const inputRef = (useRef < HTMLInputElement) | (null > null);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState();
  const [events, setEvents] = useState([]);
  const [inputText, setInputText] = useState("");

  const onFocus = () => {
    setOpen(true);
  };

  const onBlur = () => {
    setTimeout(() => setOpen(false), 100);
  };

  const handleSearch = (e) => {
    setInputText(e.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchQueryEvents(inputText);
      setEvents(Array.isArray(result) ? result : []);
    };
    fetchData();
  }, [inputText]);

  useEffect(() => {
    inputRef.current?.focus(); // コンポーネントマウント時にフォーカス
  }, []);

  return (
    <div className="flex items-center justify-center ">
      <div className="relative w-full max-w-lg">
        <input
          type="text"
          value={inputText}
          onChange={handleSearch}
          onFocus={onFocus}
          onBlur={onBlur}
          placeholder="アーティスト、曲、アルバムを検索"
          className="w-full rounded-full bg-white/90 px-12 py-3 text-gray-900 placeholder-gray-500 shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
        />
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
          <svg
            width="20"
            height="20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </span>
        {open && inputText && (
          <div className="absolute left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl z-10 max-h-80 overflow-y-auto transition">
            {events.length > 0 ? (
              events.map((event) => (
                <div className="px-6 py-3 hover:bg-gray-50 cursor-pointer transition flex items-center gap-3">
                  <Link href="events/form/" key={event.id}>
                    <span className="font-medium text-gray-900">
                      {event.title}
                    </span>
                  </Link>
                </div>
              ))
            ) : (
              <div className="px-6 py-4 text-gray-400">
                該当する結果がありません
              </div>
            )}
          </div>
        )}
      </div>
    </div>
    //     <div className="flex ">
    //         <Popover className="relative">
    //       <PopoverButton
    //         as="input"
    //         type="text"
    //         value={inputText}
    //         onChange={handleSearch}
    //         onFocus={onFocus}
    //         onBlur={onBlur}
    //         className="border rounded-3xl w-4/7 focus:bg-blue-100 hover:shadow"
    //       />
    //       <PopoverPanel anchor="bottom" className="flex flex-col border">
    //         {open && (
    //           <div className="">
    //             {inputText ? (
    //               <div className="">
    //                 {events.map((event) => (
    //                   <li key={event.id} className="flex items-center gap-2">
    //                     <Link href="/">
    //                       <span className="block w-full px-4 py-2 hover:bg-blue-50 cursor-pointer">
    //                         {event.title}
    //                       </span>
    //                     </Link>
    //                   </li>
    //                 ))}
    //               </div>
    //             ) : (
    //               <div>
    //                 <h2 className="">検索キーワードを入力してください</h2>
    //               </div>
    //             )}
    //           </div>
    //         )}
    //       </PopoverPanel>
    //     </Popover>
    //     </div>
  );
};

export default PopOver;

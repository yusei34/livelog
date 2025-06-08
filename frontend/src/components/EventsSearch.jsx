"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import Link from "next/link";
import { fetchQueryEvents } from "@/lib/api/fetchEvents";

const EventsSearch = () => {
  const inputRef = useRef < HTMLInputElement > null;
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState();
  const [events, setEvents] = useState([]);
  const [inputText, setInputText] = useState("");

  const handleKeyDown = useCallback((e) => {
    const input = inputRef.current;
    if (input && e.key === "Escape") {
      input.blur();
    }
  }, []);

  const onFocus = () => {
    setOpen(true);
  };

  const onBlur = () => {
    setOpen(false);
  };

  const handleSearch = (e) => {
    setInputText(e.target.value);
    console.log(inputText);
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchQueryEvents(inputText);
      setEvents(Array.isArray(result) ? result : []);
    };
    fetchData();
  }, [inputText]);

  return (
    <div>
      <div>
        <input
          type="text"
          value={inputText}
          onChange={handleSearch}
          onFocus={onFocus}
          //   onBlur={onBlur}
          onKeyDown={handleKeyDown}
          className="border rounded-3xl w-full data-focus:bg-blue-100 data-hover:shadow"
        />
      </div>
      {open && (
        <div className="border">
          {inputText ? (
            <div className="border">
              {events.map((event) => (
                <Link href="/">
                  <div
                    key={event.id}
                    className="flex items-center gap-2 border-50"
                  >
                    {event.title}
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="border-4">
              <h2>検索キーワードを入力してください</h2>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default EventsSearch;

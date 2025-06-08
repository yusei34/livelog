"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import Link from 'next/link';
import { fetchQueryEvents } from "@/lib/api/fetchEvents";

const Search = () => {
  const inputRef = useRef < HTMLInputElement >(null);
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
    <div className="">
      <div className="">
        <input
          type="text"
          value={inputText}
          onChange={handleSearch}
          onFocus={onFocus}
          onBlur={onBlur}
          onKeyDown={handleKeyDown}
          className="border rounded-3xl w-60 data-focus:bg-blue-100 data-hover:shadow"
        />
      </div>
      {open && (
        <div className="">
          {inputText ? (
            <div className="">
              {events.map((event) => (
                <li key={event.id} className="flex items-center gap-2">
                  <Link href='/'>{event.title}</Link>
                </li>
              ))}
            </div>
          ) : (
            <div>
              <h2 className="">検索キーワードを入力してください</h2>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;

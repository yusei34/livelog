import React, { useEffect, useState, useRef, useCallback } from "react";
import { fetchQueryActors } from "@/lib/api/fetchActors";

const SearchBar = ({ onActorSelect, selectedIds }) => {
  const inputRef = useRef(null);
  const wrapperRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [actors, setActors] = useState([]);
  const [inputText, setInputText] = useState("");

  const handleKeyDown = useCallback((e) => {
    if (e.key === "Escape") {
      inputRef.current?.blur();
      setOpen(false);
    }
  }, []);

  const onFocus = () => setOpen(true);

  const handleSearch = (e) => setInputText(e.target.value);

  useEffect(() => {
    if (!inputText) {
      setActors([]);
      return;
    }
    const fetchData = async () => {
      const result = await fetchQueryActors(inputText);
      setActors(Array.isArray(result) ? result : []);
    };
    fetchData();
  }, [inputText]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={wrapperRef} className="">
      <div className="relative w-full ">
        <input
          type="text"
          value={inputText}
          ref={inputRef}
          onKeyDown={handleKeyDown}
          onChange={handleSearch}
          onFocus={onFocus}
          placeholder="アクター名を検索"
          className="border border-green-100 w-full rounded-full bg-white/90 px-12 py-3 text-gray-900 placeholder-gray-500 shadow-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition "
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
            {actors.length > 0 ? (
              actors.map((actor) => (
                <div
                  key={actor.id}
                  className={`px-6 py-4 cursor-pointer ${
                    selectedIds.includes(actor.id)
                      ? "bg-blue-200"
                      : "hover:bg-gray-100"
                  }`}
                  onClick={() => {
                    onActorSelect(actor);
                    setOpen(false);
                    setInputText(""); // 選択後に検索欄をクリア
                  }}
                >
                  {actor.name}
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
  );
};

export default SearchBar;


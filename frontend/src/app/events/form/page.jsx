"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@headlessui/react";
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
    // 初期化（localStorageから読み込み）
    const savedTitle = localStorage.getItem("eventForm.title");
    const savedVenue = localStorage.getItem("eventForm.venue");
    const savedDate = localStorage.getItem("eventForm.date");

    if (savedTitle) setTitle(savedTitle);
    if (savedVenue) setVenue(savedVenue);
    if (savedDate) setEventDate(savedDate);
  }, []);

  useEffect(() => {
    localStorage.setItem("eventForm.title", title);
  }, [title]);

  useEffect(() => {
    localStorage.setItem("eventForm.venue", venue);
  }, [venue]);

  useEffect(() => {
    localStorage.setItem("eventForm.date", eventDate);
  }, [eventDate]);

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
      toast.success("イベントを登録しました");

      localStorage.removeItem("eventForm.title");
      localStorage.removeItem("eventForm.venue");
      localStorage.removeItem("eventForm.date");
      
      router.push("/events");
    } catch (err) {
      toast.error("登録に失敗しました");
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
            <Button className="rounded bg-sky-600 px-4 py-2 text-sm text-white data-active:bg-sky-700 data-hover:bg-sky-500">
              <Link href="../actors/select/" className="block font-semibold">
                追加
              </Link>
            </Button>
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

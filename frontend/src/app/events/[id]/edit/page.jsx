// /events/[event_id]/edit/page.jsx
"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { fetchEventById } from "@/lib/api/fetchEvents";; // 1件取得するAPI
import EventModalController from "../../../../components/EventEditModal/EventModalController"; // 下記で作成

export default function EditEventPage() {
  const { event_id } = useParams();
  const [initialEventData, setInitialEventData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!event_id) return;

    const getEventData = async () => {
      try {
        const data = await fetchEventById(event_id);
        setInitialEventData(data);
      } catch (error) {
        console.error("イベントデータの取得に失敗しました", error);
      } finally {
        setIsLoading(false);
      }
    };

    getEventData();
  }, [event_id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!initialEventData) {
    return <div>イベントデータが見つかりません。</div>;
  }

  // 取得したデータを初期値としてコントローラーに渡す
  return < EventModalController initialData={initialEventData} />;
}

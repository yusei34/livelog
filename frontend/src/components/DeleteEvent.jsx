"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteEvent } from "../lib/api/deleteEvent";
import { toast } from "sonner";
import { Button } from "@headlessui/react";
import { Trash2 } from "lucide-react";
const DeleteEvent = ({ id }) => {
  const router = useRouter();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = async () => {
    try {
      await deleteEvent(id);
      toast.success("削除しました");
      router.push("/events");
    } catch (error) {
      toast.error("削除に失敗しました");
    }
  };

  return (
    <>
      {/* 削除ボタン */}
      <Button
        className="p-2 bg-white/20 hover:bg-white/30 text-white border-white/20 rounded"
        onClick={() => setShowConfirm(true)}
      >
        <Trash2 className="h-6 w-6" />
      </Button>

      {/* 確認モーダル */}
      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="bg-white border border-gray-400 grid grid-rows-2 rounded-lg shadow-lg w-100 h-40">
            <div className="w-full py-4 row-span-1 text-gray-800 text-center font-semibold">
              このイベントを削除してもよろしいですか？
            </div>

            <div className="divide row-span-2  flex justify-center items-stretch rounded-b-lg">
              <Button
                className="border border-gray-400 w-full h-full px-4 text-blue-500 py-2 hover:bg-gray-300"
                onClick={() => setShowConfirm(false)}
              >
                キャンセル
              </Button>
              <Button
                className="w-full h-full border border-gray-400 px-4 py-2 text-red-500 hover:bg-gray-300 "
                onClick={handleDelete}
              >
                削除
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteEvent;

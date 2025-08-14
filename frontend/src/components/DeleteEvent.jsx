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
          <div className="bg-white pt-4 grid-cols-2 rounded-lg shadow-lg w-100 h-40">
            <div className="col-span-2 m-4 text-gray-800 text-center font-semibold">
              このイベントを削除してもよろしいですか？
            </div>

              <Button
                className=" col-span-1 w-40 px-4 text-blue-500 py-2 bg-gray-200 rounded hover:bg-gray-300"
                onClick={() => setShowConfirm(false)}
              >
                キャンセル
              </Button>
              <Button
                className="col-span-1 w-40 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={handleDelete}
              >
                削除
              </Button>
      
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteEvent;

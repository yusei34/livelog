"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { deleteEvent } from "../lib/api/deleteEvent";
import { toast } from "sonner";
import { Button } from "@headlessui/react";
import { Trash2 } from "lucide-react";
const DeleteEvent = ({ id }) => {
  const router = useRouter();

  const Delete = async (id) => {
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
      <Button
        className="p-2 bg-white/20 hover:bg-white/30 text-white border-white/20 rounded"
        onClick={() => Delete(id)}
      >
        <Trash2 className="h-6 w-6" />
      </Button>
    </>
  );
};

export default DeleteEvent;

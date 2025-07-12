// /components/EditEventModal.jsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Button,
  Dialog,
  DialogPanel,
  DialogTitle,
  Description,
  DialogBackdrop,
  Field,
  Input,
  Label
} from "@headlessui/react";
import { X } from "lucide-react";
import clsx from "clsx";
import { toast } from "sonner";
import { putEvent } from "@/lib/api/putEvent";

export default function EditEventModal({
  initialData,
  formData,
  setters,
  onOpenActorModal,
  onClose
}) {
  const router = useRouter();

  // 親から受け取ったstateとsetterを使用
  const { title, venue, eventDate, actorIds, actorNames } = formData;
  const { setTitle, setVenue, setEventDate, setActorIds, setActorNames } =
    setters;

  const close = () => {
    if (onClose) onClose();
  };
  const handleRemoveActor = (index) => {
    setActorIds((prev) => prev.filter((_, i) => i !== index));
    setActorNames((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await putEvent(initialData.id, {
        event: {
          title: formData.title,
          venue: formData.venue,
          event_date: formData.eventDate
        },
        actor_ids: formData.actorIds
      });
      toast.success("イベントを更新しました");
      close();
    } catch (err) {
      toast.error("更新に失敗しました");
    }
  };

  return (
    <Dialog open={true} onClose={close} as="div" className="relative z-50">
      <DialogBackdrop className="fixed inset-0 bg-black/50" />
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel className="w-full max-w-md p-6 bg-white rounded-2xl shadow-xl space-y-4">
            <div className="flex justify-between items-center">
              <DialogTitle className="text-xl font-bold">
                イベント編集
              </DialogTitle>
              <Button
                onClick={close}
                className="rounded-sm hover:opacity-70 hover:bg-gray-300"
              >
                <X />
              </Button>
            </div>
            <Description className="text-sm text-black/60">
              イベント情報を編集してください
            </Description>

            <form onSubmit={handleSubmit} className="w-full space-y-4">
              <Field>
                <Label className="text-sm/6 font-medium">タイトル</Label>
                <Input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className={clsx(/* styles */)}
                />
              </Field>
              <Field>
                <Label className="text-sm/6 font-medium">会場</Label>
                <Input
                  type="text"
                  value={venue}
                  onChange={(e) => setVenue(e.target.value)}
                  required
                  className={clsx(/* styles */)}
                />
              </Field>
              <Field>
                <Label className="text-sm/6 font-medium">開催日</Label>
                <Input
                  type="date"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  required
                  className={clsx(/* styles */)}
                />
              </Field>

              <div>
                <label className="block font-semibold">出演アーティスト</label>
                <Button
                  type="button"
                  onClick={onOpenActorModal}
                  className="rounded bg-sky-600 px-4 py-2 text-sm text-white"
                >
                  アーティストを再選択
                </Button>
                <ul className="space-y-2 mt-2">
                  {actorNames.map((name, index) => (
                    <li
                      key={index}
                      className="flex justify-between items-center border p-2 rounded"
                    >
                      <span>{name}</span>
                      <Button
                        type="button"
                        onClick={() => handleRemoveActor(index)}
                        className="text-red-500"
                      >
                        削除
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex justify-end p-2">
                <Button
                  type="submit"
                  className="h-10 rounded-md px-4 text-white bg-blue-600"
                >
                  更新する
                </Button>
              </div>
            </form>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}

import React, { useState, useEffect } from "react";
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
import { PlusCircle, X } from "lucide-react";
import axios from "axios";
import clsx from "clsx";
import { toast } from "sonner";

export default function RegisterEventModal({
  onClose,
  onOpenActorModal,
  actorIds,
  setActorIds,
  actorNames,
  setActorNames,
}) {
  const [isOpen, setIsOpen] = useState(true);
  const [title, setTitle] = useState("");
  const [venue, setVenue] = useState("");
  const [eventDate, setEventDate] = useState("");

  const close = () => {
    setIsOpen(false);
    if (onClose) onClose();
  };

  // localStorage連携
  useEffect(() => {
    const savedTitle = localStorage.getItem("eventForm.title");
    const savedVenue = localStorage.getItem("eventForm.venue");
    const savedDate = localStorage.getItem("eventForm.date");
    if (savedTitle) setTitle(savedTitle);
    if (savedVenue) setVenue(savedVenue);
    if (savedDate) setEventDate(savedDate);
  }, []);

  const handleRemoveActor = (index) => {
    setActorIds((prev) => prev.filter((_, i) => i !== index));
    setActorNames((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://127.0.0.1:8000/events", {
        event: { title, venue, event_date: eventDate },
        actor_ids: actorIds,
      });
      toast.success("イベントを登録しました");
      localStorage.removeItem("eventForm.title");
      localStorage.removeItem("eventForm.venue");
      localStorage.removeItem("eventForm.date");
      setTitle("");
      setVenue("");
      setEventDate("");
      setActorIds([]);
      setActorNames([]);
      close();
    } catch (err) {
      toast.error("登録に失敗しました");
    }
  };

  return (
    <Dialog open={isOpen} onClose={close} as="div" className="relative z-50">
      <DialogBackdrop className="fixed inset-0 bg-black/50" />
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel className="w-full max-w-md p-6 bg-white rounded-2xl shadow-xl space-y-4">
            <div className="flex justify-between items-center">
              <DialogTitle className="text-xl font-bold">
                新規イベント登録
              </DialogTitle>
              <Button
                onClick={close}
                className="rounded-sm hover:opacity-70 hover:bg-gray-300"
              >
                <X />
              </Button>
            </div>
            <Description className="text-sm text-black/60">
              参戦・参戦予定のライブを登録してください
            </Description>
            <div className="w-full max-w-lg px-4">
              <form
                onSubmit={handleSubmit}
                className="w-full space-y-4 rounded-xl bg-white"
              >
                <Field>
                  <Label className="text-sm/6 font-semibold ">タイトル</Label>
                  <Input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className={clsx(
                      "mt-3 block w-full rounded-lg border bg-white/5 px-3 py-1.5 text-sm/6 ",
                      "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-emerald-300"
                    )}
                  />
                </Field>
                <Field>
                  <Label className="text-sm/6 font-semibold ">会場</Label>
                  <Input
                    type="text"
                    value={venue}
                    onChange={(e) => setVenue(e.target.value)}
                    required
                    className={clsx(
                      "mt-3 block w-full rounded-lg border bg-white/5 px-3 py-1.5 text-sm/6 ",
                      "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-emerald-300"
                    )}
                  />
                </Field>
                <Field>
                  <Label className="text-sm/6 font-semibold ">開催日</Label>
                  <Input
                    type="date"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    required
                    className={clsx(
                      "mt-3 block w-full rounded-lg border bg-white/5 px-3 py-1.5 text-sm/6 ",
                      "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-emerald-300"
                    )}
                  />
                </Field>

                <div>
                  <label className="block font-semibold">
                    出演アーティスト
                  </label>
                  <div>
                    <Button
                      type="button"
                      onClick={() => {
                        setIsOpen(false);
                        onOpenActorModal();
                      }}
                      className="rounded-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 shadow-lg   px-4 py-2 text-sm text-white  hover:shadow-xl : transition-all duration-300"
                    >
                      追加
                    </Button>
                  </div>
                  <ul className="space-y-2">
                    {actorNames.map((name, index) => (
                      <li
                        key={index}
                        className="flex justify-between items-center border p-2 rounded"
                      >
                        {name}
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
                <div className="justify-self-end p-2">
                  <Button
                    type="submit"
                    className=" h-10 rounded-md px-4 text-white bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 shadow-lg hover:shadow-xl transition-all duration-300 "
                  >
                    登録する
                  </Button>
                </div>
              </form>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}

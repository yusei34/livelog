"use client";

/*
artistSelectPageから選択完了を押した時の遷移先として
RegisterEventコンポーネントをレンダリングするように実装を修正する
*/


import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { postEvent } from "../lib/api/fetchEvents";
import { toast } from "sonner";
import clsx from "clsx";
import { ChevronDown, PlusCircle, X } from "lucide-react";
import {
  Button,
  Dialog,
  DialogPanel,
  DialogTitle,
  Description,
  DialogBackdrop,
  Field,
  Input,
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions
} from "@headlessui/react";

const RegisterEvent = ({}) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [venue, setVenue] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [actorIds, setActorIds] = useState([]);
  const [actorNames, setActorNames] = useState([]);

  //   開閉制御用の関数
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

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

  //postの挙動を修正要
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

  // submit用のハンドラ
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     await postExpense(selected.name, itemName, amount, event_id);
  //     close();
  //     toast.success("登録完了");

  //   } catch (err) {
  //     toast.error("登録に失敗しました");
  //   }
  // };

  return (
    <>
      <Button
        onClick={open}
        className="inline-flex items-center justify-center h-9 rounded-md px-3  text-white bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 shadow-lg hover:shadow-xl transition-all duration-300"
      >
        <PlusCircle className="mr-2 h-4 w-4" />
        イベント登録
      </Button>

      <Dialog open={isOpen} onClose={close} as="div" className=" relative z-50">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black/50 duration-300 ease-out data-closed:opacity-0"
        />
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md p-6 bg-white rounded-2xl shadow-xl space-y-4"
            >
              <div className="flex justify-between items-center">
                <DialogTitle className="text-xl font-bold">
                  新規イベント登録
                </DialogTitle>
                <Button
                  onClick={close}
                  className="rounded-sm hover:opacity-70 hover:bg-gray-300"
                >
                  <X className="" />
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
                    <Label className="text-sm/6 font-medium ">title</Label>
                    <Input
                      type="text"
                      onChange={(e) => setTitle(e.target.value)}
                      className={clsx(
                        "mt-3 block w-full rounded-lg border bg-white/5 px-3 py-1.5 text-sm/6 ",
                        "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-emerald-300"
                      )}
                    />
                  </Field>
                  <Field>
                    <Label className="text-sm/6 font-medium ">Venue</Label>
                    <Input
                      type="text"
                      onChange={(e) => setVenue(e.target.value)}
                      className={clsx(
                        "mt-3 block w-full rounded-lg border bg-white/5 px-3 py-1.5 text-sm/6 ",
                        "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-emerald-300"
                      )}
                    />
                  </Field>
                  <Field>
                    <Label className="text-sm/6 font-medium ">Date</Label>
                    <Input
                      type="date"
                      onChange={(e) => setEventDate(e.target.value)}
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
                      <Button className="rounded bg-sky-600 px-4 py-2 text-sm text-white data-active:bg-sky-700 data-hover:bg-sky-500">
                        <Link
                          href="/actors/select/"
                          className="block font-semibold"
                        >
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
                          <Button
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
    </>
  );
};
export default RegisterEvent;

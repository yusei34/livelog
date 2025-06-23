"use client";

import React, { useState } from "react";
import clsx from "clsx";
// import { Button } from '@/components/Button';
import { ChevronDown, PlusCircle } from "lucide-react";
import {
  Button,
  Dialog,
  DialogPanel,
  DialogTitle,
  Description,
  DialogBackdrop,
  Field,
  Fieldset,
  Input,
  Label,
  Legend,
  Select,
  Textarea,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions
} from "@headlessui/react";

const categories = [
  { id: 1, name: "交通費" },
  { id: 2, name: "食費" },
  { id: 3, name: "グッズ" },
  { id: 4, name: "チケット代" },
  { id: 5, name: "宿泊費" },
  { id: 6, name: "その他" }
];

const RegisterExpense = ({ eventId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(categories[0]);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return (
    <>
      <Button
        onClick={open}
        className="inline-flex items-center justify-center h-9 rounded-md px-3  text-white bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 shadow-lg hover:shadow-xl transition-all duration-300"
      >
        <PlusCircle className="mr-2 h-4 w-4" />
        費用登録
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
              <DialogTitle className="text-xl font-bold">費用登録</DialogTitle>
              <Description className="text-sm text-black/60">
                ライブに関する支出を登録してください
              </Description>
              <div className="w-full max-w-lg px-4">
                <Fieldset className="space-y-4 rounded-xl bg-white">
                  <Field>
                    <Label className="text-sm/6 font-medium ">Category</Label>
                    <div className="mx-auto">
                      <Listbox
                        value={selected}
                        onChange={setSelected}
                        by='id'
                      >
                        <ListboxButton
                          className={clsx(
                            "relative block w-full rounded-lg bg-white py-1.5 pr-8 pl-3 text-left text-sm/6 border",
                            "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-emerald-300"
                          )}
                        >
                          {selected.name}
                          {/* <ChevronDown
                            className="group pointer-events-none absolute top-2.5 right-2.5 size-4 "
                            aria-hidden="true"
                          /> */}
                        </ListboxButton>
                        <ListboxOptions
                          transition
                          className={clsx(
                            "w-(--button-width) rounded-xl shadow-xl border-black/10 bg-white-500 p-1 [--anchor-gap:--spacing(1)] focus:outline-none",
                            "transition duration-100 ease-in data-leave:data-closed:opacity-0"
                          )}
                        >
                          {categories.map((category) => (
                            <ListboxOption
                              key={category.id}
                              value={category}
                              className="group flex cursor-default items-center  rounded-lg px-3 py-1.5 select-none data-focus:bg-green-200"
                            >
                              <div className="text-sm/6 text-black">{category.name}</div>
                            </ListboxOption>
                          ))}
                        </ListboxOptions>
                      </Listbox>
                    </div>
                  </Field>
                  <Field>
                    <Label className="text-sm/6 font-medium ">Amount</Label>
                    <Input
                      type="number"
                      className={clsx(
                        "mt-3 block w-full rounded-lg border bg-white/5 px-3 py-1.5 text-sm/6 ",
                        "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-emerald-300"
                      )}
                    />
                  </Field>
                  <Field>
                    <Label className="text-sm/6 font-medium ">Note</Label>
                    <Input
                      type="number"
                      className={clsx(
                        "mt-3 block w-full rounded-lg border bg-white/5 px-3 py-1.5 text-sm/6 ",
                        "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25"
                      )}
                    />
                  </Field>
                </Fieldset>
              </div>
              <div className="justify-self-end p-2">
                <Button className=" h-10 rounded-md px-4 text-white bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 shadow-lg hover:shadow-xl transition-all duration-300 ">
                  登録する
                </Button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
  //   const [isOpen, setIsOpen] = useState(false);
  //   const [category, setCategory] = useState("");
  //   const [amount, setAmount] = useState("");
  //   const [note, setNote] = useState("");

  //   const open = () => setIsOpen(true);
  //   const close = () => setIsOpen(false);

  //   const handleSubmit = (e) => {
  //     e.preventDefault();
  //     // バリデーションやAPI送信処理をここに
  //     // eventIdも使える
  //     setIsOpen(false); // 登録後にダイアログを閉じる
  //   };

  //   return (
  //     <>
  //       <Button
  //         onClick={open}
  //         className="w-5% bg-blue-600 text-white px-4 py-2 rounded-2xl "
  //       >
  //         + 新規イベント
  //       </Button>

  //       <Dialog open={isOpen} onClose={close}>
  //         <DialogPanel className="sm:max-w-[425px]">
  //           <form onSubmit={handleSubmit}>
  //             <div>
  //               <DialogTitle>費用登録</DialogTitle>
  //               <p>イベントに関連する支出を登録してください。</p>
  //             </div>
  //             <div className="grid gap-4 py-4">
  //               <div className="grid gap-2">
  //                 <label htmlFor="category">カテゴリ</label>
  //                 <select
  //                   id="category"
  //                   value={category}
  //                   onChange={(e) => setCategory(e.target.value)}
  //                   className="border rounded px-2 py-1"
  //                   required
  //                 >
  //                   <option value="">カテゴリを選択</option>
  //                   <option value="ticket">チケット</option>
  //                   <option value="transportation">交通費</option>
  //                   <option value="merchandise">グッズ</option>
  //                   <option value="food">食事</option>
  //                   <option value="accommodation">宿泊費</option>
  //                   <option value="other">その他</option>
  //                 </select>
  //               </div>
  //               <div className="grid gap-2">
  //                 <label htmlFor="amount">金額</label>
  //                 <Input
  //                   id="amount"
  //                   type="number"
  //                   placeholder="10000"
  //                   value={amount}
  //                   onChange={(e) => setAmount(e.target.value)}
  //                   required
  //                 />
  //               </div>
  //               <div className="grid gap-2">
  //                 <label htmlFor="note">メモ (任意)</label>
  //                 <Input
  //                   id="note"
  //                   placeholder="メモを入力"
  //                   value={note}
  //                   onChange={(e) => setNote(e.target.value)}
  //                 />
  //               </div>
  //             </div>
  //             <div>
  //               <Button type="submit">登録する</Button>
  //             </div>
  //           </form>
  //         </DialogPanel>
  //       </Dialog>
  //     </>
  //   );
};

export default RegisterExpense;

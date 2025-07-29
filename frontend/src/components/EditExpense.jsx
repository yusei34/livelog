"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { putExpense } from "../lib/api/putExpense";
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

const categories = [
  { id: 1, name: "交通費" },
  { id: 2, name: "食費" },
  { id: 3, name: "グッズ" },
  { id: 4, name: "チケット代" },
  { id: 5, name: "宿泊費" },
  { id: 6, name: "その他" }
];

const EditExpense = ({
  initialExpenseData, // 編集時の初期データ (必須)
  expenseId, // 編集時のID (必須)
  event_id, // 所属イベントのID (編集でも必要)
  onClose
}) => {
  const router = useRouter();
  // const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(
    categories.find((cat) => cat.name === initialExpenseData.category) ||
      categories[0]
  );
  const [itemName, setItemName] = useState(initialExpenseData.item_name || "");
  const [amount, setAmount] = useState(initialExpenseData.amount || "");

  //   開閉制御用の関数
  // const open = () => setIsOpen(true);
  // const close = () => setIsOpen(false);


  // 親から渡されたonCloseを呼び出す
  const handleClose = () => {
    if (onClose) onClose();
  };


  // submit用のハンドラ
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const putData = {
        category: selected.name,
        item_name: itemName,
        amount,
        event_id
      };
      await putExpense(expenseId,putData);
      toast.success("更新完了");
      handleClose();
      router.refresh();
    } catch (err) {
      toast.error("更新に失敗しました");
    }
  };

  return (
    <>

      <Dialog open={true} onClose={handleClose} as="div" className=" relative z-50">
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
                  費用編集
                </DialogTitle>
                <Button
                  onClick={handleClose}
                  className="rounded-sm hover:opacity-70 hover:bg-gray-300"
                >
                  <X className="" />
                </Button>
              </div>

              <Description className="text-sm text-black/60">
                ライブに関する支出を編集してください
              </Description>
              <div className="w-full max-w-lg px-4">
                <form
                  onSubmit={handleSubmit}
                  className="w-full space-y-4 rounded-xl bg-white"
                >
                  <Field>
                    <Label className="text-sm/6 font-medium ">Category</Label>
                    <div className="mx-auto">
                      <Listbox value={selected} onChange={setSelected} by="id">
                        <ListboxButton
                          className={clsx(
                            "relative block w-full rounded-lg bg-white py-1.5 pr-8 pl-3 text-left text-sm/6 border data-focus:border data-focus:border-emerald-300",
                            "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 "
                          )}
                        >
                          {selected.name}
                          <ChevronDown
                            className="group pointer-events-none absolute top-2.5 right-2.5 size-4"
                            aria-hidden="true"
                          />
                        </ListboxButton>
                        <ListboxOptions
                          transition
                          className={clsx(
                            "absolute w-(--button-width) rounded-xl shadow-xl border-black/10  bg-white-500 p-1 [--anchor-gap:--spacing(1)] focus:outline-none",
                            "overflow-y-auto transition duration-100 ease-in data-leave:data-closed:opacity-0"
                          )}
                        >
                          {categories.map((category) => (
                            <ListboxOption
                              anchor="bottom"
                              key={category.id}
                              value={category}
                              className="group flex bg-white cursor-default items-center  rounded-lg px-3 py-1.5 select-none data-focus:bg-green-200"
                            >
                              <div className="text-sm/6 text-black">
                                {category.name}
                              </div>
                            </ListboxOption>
                          ))}
                        </ListboxOptions>
                      </Listbox>
                    </div>
                  </Field>
                  <Field>
                    <Label className="text-sm/6 font-medium ">Item Name</Label>
                    <Input
                      type="text"
                      value={itemName}
                      onChange={(e) => setItemName(e.target.value)}
                      className={clsx(
                        "mt-3 block w-full rounded-lg border bg-white/5 px-3 py-1.5 text-sm/6 ",
                        "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-emerald-300"
                      )}
                    />
                  </Field>
                  <Field>
                    <Label className="text-sm/6 font-medium ">Amount</Label>
                    <Input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className={clsx(
                        "mt-3 block w-full rounded-lg border bg-white/5 px-3 py-1.5 text-sm/6 ",
                        "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-emerald-300"
                      )}
                    />
                  </Field>
                  <div className="justify-self-end p-2">
                    <Button
                      type="submit"
                      className=" h-10 rounded-md px-4 text-white bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 shadow-lg hover:shadow-xl transition-all duration-300 "
                    >
                      更新する
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
export default EditExpense;

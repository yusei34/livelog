"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { deleteExpense } from "@/lib/api/deleteExpense";
import { Button } from "@headlessui/react";
import ExpenseOptionMenu from "@/components/ExpenseOptionMenu";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from "@/components/DetailCard";
import RegisterExpense from "@/components/RegisterExpense";
import { Wallet } from "lucide-react";
import { toast } from "sonner";

function ExpenseArea({ event }) {
  const router = useRouter();

  //Delete expense
  const onDeleteExpense = async (id) => {
    try {
      await deleteExpense(id);
      toast.success("削除しました");
      router.refresh();
    } catch (error) {
      toast.error("削除に失敗しました");
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-green-50/30 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 to-emerald-500"></div>
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl text-white">
                  <Wallet className="h-5 w-5" />
                </div>
                支出費用
              </CardTitle>
              <CardDescription className="mt-2">
                {event.expenses.length >= 1 && (
                  <span className="text-2xl font-bold text-green-600">
                    合計:¥
                    {event.expenses
                      .reduce((sum, expense) => sum + expense.amount, 0)
                      .toLocaleString()}
                  </span>
                )}
              </CardDescription>
            </div>
            <RegisterExpense event_id={event.id} />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {event.expenses.length === 0 ? (
              <p>支出なし</p>
            ) : (
              event.expenses.map((expense) => (
                <div
                  key={expense.id}
                  className="flex justify-between items-center p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl hover:from-green-100 hover:to-emerald-100 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-15 h-10 bg-gradient-to-r from-green-400 to-emerald-500 rounded-lg flex items-center justify-center text-white font-bold text-[70%]">
                      {expense.category}
                    </div>
                    <span className="font-medium text-gray-900">
                      {expense.item_name}
                    </span>
                  </div>
                  <span className="font-bold text-green-600 text-lg">
                    ¥{expense.amount.toLocaleString()}
                  </span>
                  <div className="inline-flex justify-end">
                    <ExpenseOptionMenu onDelete={()=>onDeleteExpense(expense.id)}/>
                  </div>
                  
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default ExpenseArea;
/* <Button
                    type="button"
                    className=" h-10 rounded-md px-4 text-white bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 shadow-lg hover:shadow-xl transition-all duration-300 "
                    onClick={ () => onDeleteExpense(expense.id) }
                  >
                    dummy
                  </Button> */
"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from "@/components/DetailCard";
import { BarChart3, TrendingUp } from "lucide-react";
import { fetchAllEvents } from "../lib/api/fetchEvents";
import { fetchAllExpenses } from "@/lib/api/fetchExpense";

const ThisMonthExpenses = () => {
  const [events, setEvents] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [thisResult, setThisResult] = useState([]);
  const [lastResult, setLastResult] = useState([]);

  // イベントを取得
  useEffect(() => {
    fetchAllEvents().then(setEvents);
  }, []);

  useEffect(() => {
    fetchAllExpenses().then(setExpenses);
  }, []);

  // イベントが取得できたらカウント
  useEffect(() => {
    const now = new Date();
    const thisMonth = now.getMonth() + 1;
    const thisMonthEvents = events.filter(
      (event) => new Date(event.event_date).getMonth() + 1 === thisMonth
    );
    const thisMonthEventIds = thisMonthEvents.map((event) => event.id);
    const thisMonthExpenses = expenses.filter((expense) =>
      thisMonthEventIds.includes(expense.event_id)
    );
    const sumExpenses = thisMonthExpenses.reduce(
      (sum, expense) => sum + expense.amount,
      0
    );
    setThisResult(sumExpenses);
  }, [events, expenses]);

  useEffect(() => {
    const now = new Date();
    const lastMonth = now.getMonth();
    const lastMonthEvents = events.filter(
      (event) => new Date(event.event_date).getMonth() + 1 === lastMonth
    );
    const lastMonthEventIds = lastMonthEvents.map((event) => event.id);
    const lastMonthExpenses = expenses.filter((expense) =>
      lastMonthEventIds.includes(expense.event_id)
    );
    const sumExpenses = lastMonthExpenses.reduce(
      (sum, expense) => sum + expense.amount,
      0
    );
    setLastResult(sumExpenses);
  }, [events, expenses]);

  const getMonth = () => {
    const month = new Date();
    const thisMonth = month.getMonth() + 1;
    return thisMonth;
  };

  const eventGrowth = thisResult - lastResult;

  return (
    <>
      <Card className="h-[15em] group relative overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-500 bg-gradient-to-br from-orange-50 to-red-100 hover:from-orange-100 hover:to-red-200">
        <div className="top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 to-orange-500" />
        <CardContent className="p-6 my-4 mx-2 relative">
          <div className="flex items-start justify-between mb-4">
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-600">今月の支出</p>
              <p className="text-sm font-medium text-gray-600">
                {`<${getMonth()}月>`}
              </p>
              <div className="flex items-baseline gap-2">
                <h3 className="text-3xl font-bold text-gray-900">
                  ¥{thisResult.toLocaleString()}
                </h3>
              </div>
            </div>
            <div className="p-3 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
              <BarChart3 className="h-6 w-6 text-white" />
            </div>
          </div>
          <div className="flex items-center gap-2 p-3 bg-white/50 rounded-lg">
            <div
              className={`p-1 rounded-full ${
                eventGrowth >= 0 ? "bg-green-100" : "bg-red-100"
              }`}
            >
              <TrendingUp
                className={`h-3 w-3 ${
                  eventGrowth >= 0
                    ? "text-green-600"
                    : "text-red-600 rotate-180"
                }`}
              />
            </div>
            <span
              className={`text-sm font-medium ${
                eventGrowth >= 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              前月比 {eventGrowth >= 0 ? "+" : ""}¥{eventGrowth}
            </span>
            <span
              className={`text-xs ${
                eventGrowth >= 0 ? "text-green-500" : "text-red-500"
              }`}
            ></span>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default ThisMonthExpenses;

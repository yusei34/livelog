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
import {
  BarChart3,
  TrendingUp,
} from "lucide-react";
import { fetchAllEvents } from "@/lib/api/fetchEvents";
import { fetchAllExpenses } from "@/lib/api/fetchExpense";

const ThisYearExpenses = () => {
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
    const thisYear = now.getFullYear();
    const thisYearEvents = events.filter(
      (event) => new Date(event.event_date).getFullYear()=== thisYear
    );
    const thisYearEventIds = thisYearEvents.map((event) => event.id);
    const thisYearExpenses = expenses.filter((expense) =>
      thisYearEventIds.includes(expense.event_id)
    );
    const sumExpenses = thisYearExpenses.reduce(
      (sum, expense) => sum + expense.amount,
      0
    );
    setThisResult(sumExpenses);
  }, [events, expenses]);

  useEffect(() => {
    const now = new Date();
    const lastYear = now.getFullYear()-1;
    const lastYearEvents = events.filter(
      (event) => new Date(event.event_date).getFullYear() === lastYear
    );
    const lastYearEventIds = lastYearEvents.map((event) => event.id);
    const lastYearExpenses = expenses.filter((expense) =>
      lastYearEventIds.includes(expense.event_id)
    );
    const sumExpenses = lastYearExpenses.reduce(
      (sum, expense) => sum + expense.amount,
      0
    );
    setLastResult(sumExpenses);
  }, [events, expenses]);

  const getYear = () => {
    const year = new Date();
    const thisYear = year.getFullYear();
    return thisYear
  };

  const eventGrowth = thisResult - lastResult;

  return (
    <>
      <Card className="h-[15em] group relative overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-500 bg-gradient-to-br from-purple-50 to-violet-100 hover:from-purple-100 hover:to-violet-200">
        <div className="top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-500 to-purple-500" />
        <CardContent className="p-6 my-4 mx-2 relative">
          <div className="flex items-start justify-between mb-4">
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-600">
                今年の支出
              </p>
              <p className="text-sm font-medium text-gray-600">
                {`<${getYear()}年>`}
              </p>
              <div className="flex items-baseline gap-2">
                <h3 className="text-3xl font-bold text-gray-900">
                  ¥{thisResult.toLocaleString()}
                </h3>
              </div>
            </div>
            <div className="p-3 bg-gradient-to-br from-purple-500 to-violet-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
              <BarChart3 className="h-6 w-6 text-white" />
            </div>
          </div>
          <div className="flex items-center gap-2 p-3 bg-white/50 rounded-lg">
            <div
              className={`p-1 rounded-full ${
                eventGrowth >= 0 ? "bg-green-100" : "bg-violet-100"
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
              前年比 {eventGrowth >= 0 ? "+" : ""}¥{eventGrowth}
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

export default ThisYearExpenses;

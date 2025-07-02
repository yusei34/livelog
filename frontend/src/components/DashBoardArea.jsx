import React from "react";
import ThisMonthParticipation from "./ThisMonthParticipation";
import ThisYearParticipation from "./ThisYearParticipation";
import ThisYearExpenses from "./ThisYearExpenses";
import ThisMonthExpenses from "./ThisMonthExpenses";
import { BarChart3 } from "lucide-react";

const DashBoardArea = () => {
  return (
    <>
      <div className="grid-cols-4">
        <div className="col-span-4 text-center space-y-2 px-8 pb-8">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent flex items-center  gap-3">
            <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl text-white">
              <BarChart3 className="h-6 w-6" />
            </div>
            統計ダッシュボード
          </h2>
        </div>
        <div className="col-span-4 h-[15em] grid grid-cols-4 gap-6 items-center  px-8  pb-1.5">
          <div className="">
            <ThisYearParticipation />
          </div>

          <div className="">
            <ThisMonthParticipation />
          </div>

          <div className="">
            <ThisYearExpenses />
          </div>
          <div className="">
            <ThisMonthExpenses />
          </div>
        </div>
      </div>
    </>
  );
};

export default DashBoardArea;

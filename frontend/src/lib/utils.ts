import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const dateFormat = async (date) =>{
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const w = date.getDay();
        const week = ["日", "月", "火", "水", "木", "金", "土"];
        const result = `${year}年${month}月${day}日(${week[w]})`;
        return result
    }
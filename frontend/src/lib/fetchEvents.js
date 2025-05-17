// lib/fetchEvents.js
import axios from 'axios';

export async function fetchEvents() {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/events`);
    return res.data.data; 
  } catch (error) {
    console.error('イベント取得失敗:', error);
    throw new Error('イベント取得に失敗しました');
  }
}

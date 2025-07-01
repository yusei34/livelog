// lib/fetchEvents.js
import axios from 'axios';

export async function fetchExpenses(skip=0, limit=20) {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/expenses?skip=${skip}&limit=${limit}`);
    return res.data; 
  } catch (error) {
    console.error('イベント取得失敗:', error);
    throw new Error('イベント取得に失敗しました');
  }
}

export async function fetchAllExpenses() {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/expenses`);
    return res.data; 
  } catch (error) {
    console.error('イベント取得失敗:', error);
    throw new Error('イベント取得に失敗しました');
  }
}

export async function fetchQueryEvents(q) {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/events?q=${q}`);
    return res.data; 
  } catch (error) {
    console.error('イベント取得失敗:', error);
    throw new Error('イベント取得に失敗しました');
  }
}

export async function fetchEventById(id) {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/events/${id}`);
    return res.data; 
  } catch (error) {
    console.error('イベント取得失敗:', error);
    throw new Error('イベント取得に失敗しました');
  }
}



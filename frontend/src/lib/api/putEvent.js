import axios from 'axios';

export async function fetchEvents(skip=0, limit=20) {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/events?skip=${skip}&limit=${limit}`);
    return res.data.data; 
  } catch (error) {
    console.error('イベント取得失敗:', error);
    throw new Error('イベント取得に失敗しました');
  }
}
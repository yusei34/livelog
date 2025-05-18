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

export async function postEvent(event, actor_ids) {
    try {
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/events`,{
            event,
            actor_ids,
        });
        return { success : true };
    } catch (error) {
        console.error('登録失敗', error);
        return { message : '登録に失敗しました' };
    }
    
}

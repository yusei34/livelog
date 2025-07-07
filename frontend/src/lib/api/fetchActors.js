// src/lib/api/fetchActors.js
import axios from 'axios';

export async function fetchActors(skip=0, limit=20) {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/actors?skip=${skip}&limit=${limit}`);
    return res.data.data; 
  } catch (error) {
    console.error('アーティストの取得失敗:', error);
    throw new Error('アーティストの取得に失敗しました');
  }
}

export async function fetchQueryActors(q) {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/actors?q=${q}`);
    return res.data.data; 
  } catch (error) {
    console.error('アーティスト取得失敗:', error);
    throw new Error('アーティスト情報の取得に失敗しました');
  }
}
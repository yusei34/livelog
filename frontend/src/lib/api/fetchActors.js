// src/lib/api/fetchActors.js
import axios from 'axios';

export async function fetchActors({ query = '' } = {}) {
  try {
    const response = await axios.get('http://127.0.0.1:8000/actors/', {
      params: query ? { name: query } : {},
    });
    return response.data.data; // ← FastAPIの "data" フィールドを展開
  } catch (error) {
    console.error('Failed to fetch actors:', error);
    return [];
  }
}

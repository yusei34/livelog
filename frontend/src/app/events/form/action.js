'use server';

import axios from 'axios';

export async function registerEvent(prevState, formData) {
  const title = formData.get('title');
  const venue = formData.get('venue');
  const event_date = formData.get('event_date');

  const actor_ids = formData.getAll('actor_ids'); // ← actor_idを配列で取得

  if (!title || !venue || !event_date) {
    return { message: '全ての項目を入力してください' };
  }

  try {
    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/events`, {
      event: { title, venue, event_date },
      actor_ids,
    });

    return { success: true };
  } catch (err) {
    console.error(err);
    return { message: '登録に失敗しました' };
  }
}

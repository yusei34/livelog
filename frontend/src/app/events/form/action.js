'use server';
import { postEvent } from '@/lib/fetchEvents';
import { fetchActorsByIds } from '@/lib/fetchActors';

export async function registerEvent(prevState, formData) {
  const title = formData.get('title');
  const venue = formData.get('venue');
  const event_date = formData.get('event_date');
  const actor_ids = [] //データの取得方法について検討

  if (!title || !venue || !event_date) {
    return { message: 'イベント名,会場,開催日は必須入力です。' };
  }

  const event = { title, venue, event_date };
  return await postEvent(event, actor_ids)
}

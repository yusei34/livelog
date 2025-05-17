import { fetchEvents } from '@/lib/fetchEvents';
import EventCard from '@/components/EventCard';

export default async function EventsPage() {
  let events = [];

  try {
    events = await fetchEvents();
  } catch (e) {
    return <p className="text-red-500">イベントの読み込みに失敗しました</p>;
  }

  return (
    <div className="space-y-4 p-4">
      <h1 className="text-2xl font-bold">イベント一覧</h1>
      {events.length === 0 ? (
        <p>イベントがありません</p>
      ) : (
        events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))
      )}
    </div>
  );
}


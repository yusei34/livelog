import Link from 'next/link';

export default function InputEventActors({ selectedActors }) {
  return (
    <div className="space-y-2">
      <label className="font-bold">出演アクター</label>
      <ul className="list-disc list-inside">
        {selectedActors.map((actor) => (
          <li key={actor.id}>
            {actor.name}
            {/* TODO: 削除ボタン */}
          </li>
        ))}
      </ul>
      <Link href="/actors/select">
        <button type="button" className="bg-gray-200 px-3 py-1 rounded">
          アクターを追加
        </button>
      </Link>
    </div>
  );
}

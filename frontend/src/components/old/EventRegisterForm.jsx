'use client';

import { useActionState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { registerEvent } from '@/app/events/form/action';
import SubmitButton from './SubmitButton';
import InputEventTitle from './EventFormParts/InputEventTitle';
import InputEventVenue from './EventFormParts/InputEventVenue';
import InputEventDate from './EventFormParts/InputEventDate';
// import InputEventActors from './EventFormParts/InputEventActors';
import Link from 'next/link';

export default function EventRegisterForm() {
  const [formState, formAction] =useActionState(registerEvent, {
    message: '',
    success: false,
  });

  const router = useRouter();
  const searchParams = useSearchParams();

  // actor_idとnameをURLクエリから受け取り、selectedActorsに反映
  const [selectedActors, setSelectedActors] = useState([]);

  useEffect(() => {
    const ids = searchParams.getAll('actor_ids');
    const names = searchParams.getAll('actor_names');
    if (ids.length && ids.length === names.length) {
      const actors = ids.map((id, i) => ({
        id,
        name: names[i],
      }));
      setSelectedActors(actors);
    }
  }, [searchParams]);

  const handleRemove = (idToRemove) => {
    setSelectedActors((prev) =>
      prev.filter((actor) => actor.id !== idToRemove)
    );
  };

  return (
    <form action={formAction} className="space-y-4 p-4">
      {formState.message && (
        <p className="text-red-500">{formState.message}</p>
      )}

      <InputEventTitle />
      <InputEventVenue />
      <InputEventDate />
      {/* <InputEventActors/> */}

      {/* Hidden inputs */}
      {selectedActors.map((actor) => (
        <input
          key={actor.id}
          type="hidden"
          name="actor_ids"
          value={actor.id}
        />
      ))}

      {/* 選択済みアクター表示 */}
      <div>
        <p className="font-bold">選択中のアクター:</p>
        <ul className="list-disc pl-5">
          {selectedActors.map((actor) => (
            <li key={actor.id} className="flex items-center justify-between">
              <span>{actor.name}</span>
              <button
                type="button"
                onClick={() => handleRemove(actor.id)}
                className="text-red-500 text-sm"
              >
                削除
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* アクター追加ボタン */}
      <Link
        href={{
          pathname: '/actors/select',
          query: {
            selected: selectedActors.map((a) => a.id),
          },
        }}
        className="inline-block bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded"
      >
        アクターを追加
      </Link> 

      <SubmitButton />
    </form>
  );
}

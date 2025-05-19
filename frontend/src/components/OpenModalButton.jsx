'use client';

import { useState } from 'react';
import EventFormModal from './EventFormModal';

export default function OpenModalButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="w-5% bg-blue-600 text-white px-4 py-2 rounded-2xl "
      >
        + 新規イベント
      </button>
      <EventFormModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
}

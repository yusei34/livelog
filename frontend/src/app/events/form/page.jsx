'use client';
import { useFormState, useFormStatus } from 'react-dom';
import { registerEvent } from './action';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Submit中のローディング表示
function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="bg-blue-600 text-white px-4 py-2 rounded"
    >
      {pending ? '送信中...' : '登録'}
    </button>
  );
}

export default function NewEventPage() {
  const router = useRouter();
  const [formState, formAction] = useFormState(registerEvent, { message: '', success: false });

  // 成功時リダイレクト
  useEffect(() => {
    if (formState.success) {
      router.push('/events');
    }
  }, [formState, router]);

  return (
    <div className="p-6 max-w-md mx-auto space-y-4">
      <h1 className="text-2xl font-bold">イベント登録</h1>
      {formState.message && (
        <p className="text-red-500">{formState.message}</p>
      )}
      <form action={formAction} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="イベント名"
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="venue"
          placeholder="会場"
          className="w-full border p-2 rounded"
        />
        <input
          type="date"
          name="event_date"
          className="w-full border p-2 rounded"
        />
        <SubmitButton />
      </form>
    </div>
  );
}

    

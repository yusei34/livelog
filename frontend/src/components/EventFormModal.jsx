'use client';

import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { useRouter } from 'next/navigation';
import { registerEvent } from '@/app/events/form/action';
import { fetchActors } from '@/lib/fetchActors';
import SubmitButton from './SubmitButton';

export default function EventFormModal({ isOpen, setIsOpen }) {
    const [formState, formAction] = useFormState(registerEvent, { message: '', success: false });
    const [actors, setActors] = useState([]);
    const router = useRouter();
  
    useEffect(() => {
      fetchActors().then(setActors);
    }, []);
  
    useEffect(() => {
      if (formState.success) {
        setIsOpen(false);
        router.refresh(); // ページ再取得でイベント一覧更新
      }
    }, [formState.success, setIsOpen, router]);
  
    return (
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" onClose={() => setIsOpen(false)} className=" relative z-50">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300" leave="ease-in duration-200"
            enterFrom="opacity-0" enterTo="opacity-100"
            leaveFrom="opacity-100" leaveTo="opacity-0"
          >
            <div className="fixed inset-0  bg-opacity-25" />
          </Transition.Child>
  
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300" leave="ease-in duration-200"
              enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100"
              leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md p-6 bg-white border rounded-2xl shadow-lg space-y-4">
                <Dialog.Title className="text-lg font-bold">イベント登録</Dialog.Title>
                {formState.message && <p className="text-red-500">{formState.message}</p>}
                <form action={formAction} className="space-y-4">
                  <input name="title" placeholder="イベント名" className="w-full border p-2 rounded" />
                  <input name="venue" placeholder="会場" className="w-full border p-2 rounded" />
                  <input name="event_date" type="date" className="w-full border p-2 rounded" />
                  <div className="space-y-1">
                    {actors.map(actor => (
                      <label key={actor.id} className="block">
                        <input type="checkbox" name="actor_ids" value={actor.id} className="mr-2" />
                        {actor.name}
                      </label>
                    ))}
                  </div>
                  <div className="text-right">
                    <SubmitButton />
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    );
  }
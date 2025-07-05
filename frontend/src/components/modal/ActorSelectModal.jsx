'use client'
import React, { useState, useEffect } from "react";
import { Button, Dialog, DialogPanel, DialogTitle, DialogBackdrop } from "@headlessui/react";
import { fetchActors } from "@/lib/api/fetchActors";

export default function ActorSelectModal({
  initialSelectedIds = [],
  initialSelectedNames = [],
  onConfirm,
  onCancel,
}) {
  const [isOpen, setIsOpen] = useState(true);
  const [query, setQuery] = useState("");
  const [actors, setActors] = useState([]);
  const [filtered, setFiltered] = useState([]);
  // 選択状態はidとnameの配列で管理
  const [selectedIds, setSelectedIds] = useState(initialSelectedIds);
  const [selectedNames, setSelectedNames] = useState(initialSelectedNames);

  useEffect(() => {
    const loadActors = async () => {
      const data = await fetchActors();
      setActors(data);
      setFiltered(data);
    };
    loadActors();
  }, []);

  useEffect(() => {
    const q = query.trim().toLowerCase();
    setFiltered(
      actors.filter((actor) => actor.name.toLowerCase().includes(q))
    );
  }, [query, actors]);

  const toggleActor = (actor) => {
    const idx = selectedIds.indexOf(actor.id);
    if (idx !== -1) {
      setSelectedIds((prev) => prev.filter((id) => id !== actor.id));
      setSelectedNames((prev) => prev.filter((_, i) => i !== idx));
    } else {
      setSelectedIds((prev) => [...prev, actor.id]);
      setSelectedNames((prev) => [...prev, actor.name]);
    }
  };

  const removeActor = (id) => {
    const idx = selectedIds.indexOf(id);
    setSelectedIds((prev) => prev.filter((v) => v !== id));
    setSelectedNames((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleConfirm = () => {
    setIsOpen(false);
    if (onConfirm) onConfirm(selectedIds, selectedNames);
  };

  const handleCancel = () => {
    setIsOpen(false);
    if (onCancel) onCancel();
  };

  return (
    <Dialog open={isOpen} onClose={handleCancel} as="div" className="relative z-50">
      <DialogBackdrop className="fixed inset-0 bg-black/50" />
      <div className="fixed inset-0 z-10 w-full overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel className="w-full max-w-lg p-6 bg-white rounded-2xl shadow-xl space-y-4">
            <DialogTitle className="text-xl font-bold">
              アクター検索・選択
            </DialogTitle>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="アクター名を検索"
              className="w-full border px-3 py-2 rounded"
              aria-label="アクター名検索"
            />
            <ul className="space-y-2">
              {filtered.map((actor) => (
                <li
                  key={actor.id}
                  onClick={() => toggleActor(actor)}
                  className={`border p-2 rounded cursor-pointer ${
                    selectedIds.includes(actor.id)
                      ? "bg-blue-200"
                      : "hover:bg-gray-100"
                  }`}
                  aria-selected={selectedIds.includes(actor.id)}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") toggleActor(actor);
                  }}
                >
                  {actor.name}
                </li>
              ))}
            </ul>
            <h2 className="text-lg font-semibold mt-6">選択中のアクター</h2>
            <ul className="space-y-2">
              {selectedIds.map((id, idx) => (
                <li
                  key={id}
                  className="flex justify-between items-center border p-2 rounded"
                >
                  {selectedNames[idx]}
                  <button
                    onClick={() => removeActor(id)}
                    className="text-red-500"
                    type="button"
                  >
                    削除
                  </button>
                </li>
              ))}
            </ul>
            <div className="flex gap-2 mt-4">
              <Button
                onClick={handleConfirm}
                className="px-4 py-2 bg-blue-600 text-white rounded"
                type="button"
                disabled={selectedIds.length === 0}
              >
                選択完了
              </Button>
              <Button
                onClick={handleCancel}
                className="px-4 py-2 bg-gray-400 text-white rounded"
                type="button"
              >
                キャンセル
              </Button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}

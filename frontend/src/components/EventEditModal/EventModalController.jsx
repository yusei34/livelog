"use client";
import { useState } from "react";
import EditEventModal from "./EditEventModal";
import ActorSelectModal from "./ActorSelectModal";
import { Button } from "@headlessui/react";
import { Edit } from "lucide-react";

export default function EventModalController({ initialData, onUpdateSuccess }) {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showActorModal, setShowActorModal] = useState(false);

  // フォームの入力値を親で一元管理
  const [title, setTitle] = useState(initialData?.title || "");
  const [venue, setVenue] = useState(initialData?.venue || "");
  const [eventDate, setEventDate] = useState(initialData?.event_date || "");
  const [actorIds, setActorIds] = useState(
    initialData?.actors?.map((a) => a.id) || []
  );
  const [actorNames, setActorNames] = useState(
    initialData?.actors?.map((a) => a.name) || []
  );

  return (
    <>
      <Button
        onClick={() => setShowEditModal(true)}
        className="p-2 bg-white/20 hover:bg-white/30 text-white border-white/20 rounded"
      >
      <Edit className="h-6 w-6" />
      </Button>

      {/* 編集モーダルを表示 */}
      {showEditModal && (
        <EditEventModal
          initialData={initialData}
          // フォームの値をpropsで渡す
          formData={{ title, venue, eventDate, actorIds, actorNames }}
          // フォームの値を変更する関数を渡す
          setters={{
            setTitle,
            setVenue,
            setEventDate,
            setActorIds,
            setActorNames
          }}
          onClose={() => setShowEditModal(false)}
          // アーティスト選択モーダルを開くための関数
          onOpenActorModal={() => {
            setShowEditModal(false);
            setShowActorModal(true);
          }}
        />
      )}

      {/* アーティスト選択モーダルを表示 */}
      {showActorModal && (
        <ActorSelectModal
          initialSelectedIds={actorIds}
          initialSelectedNames={actorNames}
          // 選択完了時の処理
          onConfirm={(ids, names) => {
            setActorIds(ids);
            setActorNames(names);
            setShowActorModal(false);
            setShowEditModal(true); // 編集モーダルに戻る
          }}
          // キャンセル時の処理
          onCancel={() => {
            setShowActorModal(false);
            setShowEditModal(true); // 編集モーダルに戻る
          }}
        />
      )}
    </>
  );
}

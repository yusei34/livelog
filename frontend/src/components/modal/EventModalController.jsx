"use client";
import { useState } from "react";
import RegisterEventModal from "./RegisterEventModal";
import ActorSelectModal from "./ActorSelectModal";
import { Button } from "@headlessui/react";
import { PlusCircle } from "lucide-react";

export default function EventModalController() {
  const [showEventModal, setShowEventModal] = useState(false);
  const [showActorModal, setShowActorModal] = useState(false);
  const [actorIds, setActorIds] = useState([]);
  const [actorNames, setActorNames] = useState([]);

  return (
    <>
      <Button
        onClick={() => setShowEventModal(true)}
        className="inline-flex items-center justify-center h-9 rounded-md px-3  text-white bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 shadow-lg hover:shadow-xl transition-all duration-300"
      >
        <PlusCircle className="mr-2 h-4 w-4" />
        イベント登録
      </Button>
      {showEventModal && (
        <RegisterEventModal
          onClose={() => setShowEventModal(false)}
          onOpenActorModal={() => {
            setShowEventModal(false);
            setShowActorModal(true);
          }}
          actorIds={actorIds}
          setActorIds={setActorIds}
          actorNames={actorNames}
          setActorNames={setActorNames}
        />
      )}
      {showActorModal && (
        <ActorSelectModal
          initialSelectedIds={actorIds}
          initialSelectedNames={actorNames}
          onConfirm={(ids, names) => {
            setActorIds(ids);
            setActorNames(names);
            setShowActorModal(false);
            setShowEventModal(true);
          }}
          onCancel={() => {
            setShowActorModal(false);
            setShowEventModal(true);
          }}
        />
      )}
    </>
  );
}

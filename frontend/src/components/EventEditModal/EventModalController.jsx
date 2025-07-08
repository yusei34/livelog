"use client";
import { useState } from "react";
import RegisterEventModal from "./RegisterEventModal";
import ActorSelectModal from "./ActorSelectModal";
import { Button } from "@headlessui/react";
import {  Edit} from "lucide-react";

export default function EventModalController() {
  const [showEventModal, setShowEventModal] = useState(false);
  const [showActorModal, setShowActorModal] = useState(false);
  const [actorIds, setActorIds] = useState([]);
  const [actorNames, setActorNames] = useState([]);

  return (
    <>
      <Button
        onClick={() => setShowEventModal(true)}
        className="p-2 bg-white/20 hover:bg-white/30 text-white border-white/20 rounded"
      >
        <Edit className="h-6 w-6" />
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

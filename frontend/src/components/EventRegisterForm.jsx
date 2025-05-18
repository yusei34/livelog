import React from "react";

import { useFormState, useFormStatus } from "react-dom";
import { registerEvent } from "@/app/events/form/action";
import InputEventTitle from "./InputEventTitle";
import InputEventVenue from "./InputEventVenue";
import InputEventDate from "./InputEventDate";
import InputEventActors from "./InputEventActors";
import SubmitButton from "./SubmitButton";

const EventRegisterForm = () => {
  const [formState, formAction] = useFormState(registerEvent, {
    message: "",
    success: false
  });
  return (
    <>
      <form action={formAction} className="space-y-4">
        <div>
          <InputEventTitle />
        </div>
        <div>
          <InputEventVenue />
        </div>
        <div>
          <InputEventDate />
        </div>
        <div>
          <InputEventActors />
        </div>
        <div>
            <SubmitButton />
        </div>
      </form>
    </>
  );
};

export default EventRegisterForm;

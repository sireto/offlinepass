import FormContainer from "@app/components/form-views/container";
import { FormViews } from "@app/models/enums/formEnums";
import React from "react";

export default function GenerateMsk() {
  return (
    <div className="flex w-full min-h-screen justify-center py-44 bg-lightBackground">
      <FormContainer className={undefined} />
    </div>
  );
}

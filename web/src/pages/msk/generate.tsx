import FormContainer from "@app/components/form-views/container";
import GenerateMskView from "@app/components/msk/generate-msk-view";
import { FormViews } from "@app/models/enums/formEnums";
import React from "react";

export default function GenerateMsk() {
  return (
    <div className="flex w-full  justify-center  py-5 px-8 min-h-full items-center">
      <GenerateMskView />
    </div>
  );
}

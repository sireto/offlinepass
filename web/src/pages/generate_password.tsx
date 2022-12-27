import FormContainer from "@app/components/form-views/container";
import { FormViews } from "@app/models/enums/form-enums";
import React from "react";

export default function generate_password() {
  return (
    <div className="flex w-full min-h-screen justify-center py-44 bg-[#F5F9FA]">
      <FormContainer formView={FormViews.GENERATE_PASSWORD_VIEW} />
    </div>
  );
}

import { FormViews } from "@app/models/enums/formEnums";
import GenerateMskView from "@app/components/msk/generate-msk-view";
import GeneratePasswordView from "./generate-password-view";

interface FormContainerInterface {
  formView: FormViews;
}
function renderFormContent(view: FormViews) {
  switch (view) {
    case FormViews.GENERATE_PASSWORD_VIEW:
      return <GeneratePasswordView />;
    case FormViews.GENERATE_MSK_VIEW:
      return <GenerateMskView />;
    default:
      return null;
  }
}

export default function FormContainer({ formView }: FormContainerInterface) {
  return (
    <div className="flex flex-col justify-center w-full h-full">
      <div>{renderFormContent(formView)}</div>
    </div>
  );
}

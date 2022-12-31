import { FormViews } from "@app/models/enums/formEnums";
import GeneratePasswordView from "@app/components/generate-password/generate-password-view";
import GenerateMskView from "@app/components/msk/generate-msk-view";

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
    <div className=" w-full h-full   bg-white">
      <div>{renderFormContent(formView)}</div>
    </div>
  );
}

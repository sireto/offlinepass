import { FormViews } from "@app/models/enums/formEnums";
import GeneratePasswordView from "../generate-password/generate-password-view";
import GenerateMskView from "../msk/generate-msk-view";

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
    <div className="w-full 2xl:w-1/3 h-full mx-4 sm:mx-8 md:mx-32 lg:mx-64 xl:mx-80 2xl:mx-96 px-4 sm:px-12 py-10 bg-white rounded-lg shadow-xl">
      <div>{renderFormContent(formView)}</div>
    </div>
  );
}

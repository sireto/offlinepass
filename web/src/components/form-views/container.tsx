import { FormViews } from "@app/models/enums/formEnums";
import GenerateMskView from "@app/components/msk/generate-msk-view";
import GeneratePasswordView from "./generate-password-view";
import cn from "classnames";

interface FormContainerInterface {
  formView: FormViews;
  className?: string;
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

export default function FormContainer({
  formView,
  className,
}: FormContainerInterface) {
  return (
    <div
      className={cn(
        "flex flex-col  justify-center w-full h-full px-8  bg-white",
        className
      )}
    >
      <div>{renderFormContent(formView)}</div>
    </div>
  );
}

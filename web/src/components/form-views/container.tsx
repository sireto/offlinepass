import GeneratePasswordView from "@app/components/form-views/generate-password-view";
import cn from "classnames";

function renderFormContent() {
  return <GeneratePasswordView />;
}

export default function FormContainer({ className }) {
  return (
    <div
      className={cn(
        "flex flex-col  justify-center w-full h-full items-end",
        className
      )}
    >
      <div className="lg:w-auto w-full h-min">{renderFormContent()}</div>
    </div>
  );
}

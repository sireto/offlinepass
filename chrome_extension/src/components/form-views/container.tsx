import GeneratePasswordView from "./generate-password-view";
import cn from "classnames";

function renderFormContent() {
  return <GeneratePasswordView />;
}

export default function FormContainer({ className }) {
  return (
    <div
      className={cn(
        "flex flex-col  justify-center w-full h-full  bg-white",
        className
      )}
    >
      {renderFormContent()}
    </div>
  );
}

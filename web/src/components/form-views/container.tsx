import GeneratePasswordView from "@app/components/form-views/generate-password-view";
import cn from "classnames";

export default function FormContainer({ className }) {
  return (
    <div
      className={cn(
        "flex flex-col  justify-center h-full lg:w-auto w-full items-end",
        className
      )}
    >
      <GeneratePasswordView />
    </div>
  );
}

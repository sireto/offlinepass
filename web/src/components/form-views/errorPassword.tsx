import { Check } from "@app/components/icons/check";
import { Xmark } from "@app/components/icons/xmark";

interface ErrorPasswordProps {
    isPasswordContentMatch:boolean,
    errorPasswordContent:string,
}

export default function ErrorPassword({
    errorPasswordContent,
  isPasswordContentMatch,
}:ErrorPasswordProps) {
    const iconSize = "h-4 w-4"
  return (
    <div
      className={`flex space-x-4 text-xs ${
        isPasswordContentMatch ? "text-green-600" : "text-red-700"
      }`}
    >
      {isPasswordContentMatch ? (
        <Check className={iconSize} />
      ) : (
        <Xmark className={iconSize} />
      )}
      <p>{errorPasswordContent}</p>
    </div>
  );
}

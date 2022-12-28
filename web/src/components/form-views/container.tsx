import GeneratePasswordView from "../generate-password/generate-password-view";

export default function FormContainer() {
  return (
    <div className="w-1/3 h-full px-12 py-10 bg-white rounded-lg shadow-xl">
      <GeneratePasswordView />
    </div>
  );
}

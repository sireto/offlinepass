import CarouselView from "@app/components/carousel-view";
import FormContainer from "@app/components/form-views/container";
import PasswordToast from "@app/components/ui/password-toast";
import { FormViews } from "@app/models/enums/formEnums";

export default function Home() {
  return (
    <div className="flex flex-col lg:flex-row md:space-y-8 lg:space-y-0 w-full h-full">
      <PasswordToast />
      <CarouselView className="w-full lg:w-1/2 xl:w-2/5 h-full" />
      <FormContainer
        className="w-full lg:w-1/2 xl:w-3/5"
        formView={FormViews.GENERATE_PASSWORD_VIEW}
      />
    </div>
  );
}

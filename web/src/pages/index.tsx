import CarouselView from "@app/components/carousel-view";
import FormContainer from "@app/components/form-views/container";
import { FormViews } from "@app/models/enums/formEnums";

export default function Home() {
  return (
    <div className="flex flex-col lg:flex-row md:space-y-8 lg:space-y-0 w-full h-full">
      <CarouselView className="w-full lg:w-3/4 h-full" />
      <FormContainer formView={FormViews.GENERATE_PASSWORD_VIEW} />
    </div>
  );
}

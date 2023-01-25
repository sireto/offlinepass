import CarouselView from "@app/components/carousel-view";
import FormContainer from "@app/components/form-views/container";

export default function Home() {
  return (
    <div className="flex flex-col lg:flex-row md:space-y-8 lg:space-y-0 w-full h-full">
      <FormContainer className="w-full lg:w-1/2 h-full" />
      <CarouselView className="w-full lg:w-1/2 h-full bg-lightBackground" />
    </div>
  );
}

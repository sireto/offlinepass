import FormContainer from "@app/components/form-views/container";
import BannerContainer from "@app/containers/BannerContainer";

export default function Home() {
  return (
    <div className="flex flex-col lg:flex-row md:space-y-8 lg:px-14 mb-10 lg:mb-0 lg:space-y-0 w-full h-full justify-between">
      <BannerContainer className="w-full lg:w-1/2" />
      <FormContainer className="w-full h-full lg:w-1/2" />
    </div>
  );
}

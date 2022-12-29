import FormContainer from "@app/components/form-views/container";
import BannerContainer from "@app/containers/BannerContainer";
import { FormViews } from "@app/models/enums/formEnums";
import BenefitContainer from "@app/containers/BenifitsContainer";
export default function Home() {
  return (
    <div className="flex flex-col px-8 2xl:px-24 pb-20 min-h-screen bg-lightBackground ">
      {/* <BannerContainer /> */}
      <div className="flex w-full justify-center py-10">
        <FormContainer formView={FormViews.GENERATE_PASSWORD_VIEW} />
      </div>
      <BenefitContainer />
    </div>
  );
}

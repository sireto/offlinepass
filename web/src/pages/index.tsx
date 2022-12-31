import FormContainer from "@app/components/form-views/container";
import BannerContainer from "@app/containers/BannerContainer";
import { FormViews } from "@app/models/enums/formEnums";
import BenefitContainer from "@app/containers/BenifitsContainer";
import CarouselView from "@app/components/carousel-view";
import { useBreakpoint } from "@app/lib/hooks/use-breakpoint";
import { useIsMounted } from "@app/lib/hooks/use-is-mounted";
export default function Home() {
  const breakpoint = useBreakpoint();
  const isMounted = useIsMounted();
  if (
    isMounted &&
    (["xs", "sm", "md", "lg"].indexOf(breakpoint) === -1 ||
      ["xs", "sm", "md", "lg"].indexOf(breakpoint) === 3)
  )
      return (
        // <div className="flex flex-col pb-20 min-h-screen bg-lightBackground ">
        // {/* <BannerContainer /> */}
        <div className="flex w-full">
          <CarouselView className="w-3/4" />
          <FormContainer formView={FormViews.GENERATE_PASSWORD_VIEW} />
        </div>
        // {/* <BenefitContainer />
        // </div> */}
      );

  //mobileview
    return (
      <div className="flex flex-col w-full pb-20">
        <CarouselView className="w-full" />
        <FormContainer formView={FormViews.GENERATE_PASSWORD_VIEW} />
        <BenefitContainer />
      </div>
    );
}

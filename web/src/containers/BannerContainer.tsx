import Image from "next/image";
import BannerImage from "@app/assets/images/banner_image.png";
import { bannerConstants } from "@app/constants/banner-constants";
import Button from "@app/components/ui/button/button";
import AnchorLink from "@app/components/ui/links/anchor-link";
import { useBreakpoint } from "@app/lib/hooks/use-breakpoint";

export default function BannerContainer() {
  const breakpoint = useBreakpoint();

  const getResponsiveBannerImage = () => {
    switch (breakpoint) {
      case "3xl":
        return <Image src={BannerImage} alt={""} height={600} width={400} />;
      default:
        return <Image src={BannerImage} alt={""} height={600} width={350} />;
    }
  };

  const bannerDetailsComponent = (
    <div className="flex flex-col items-center md:items-start space-y-6 md:space-y-14 ">
      <div className="text-3xl md:text-4xl lg:text-5xl font-medium lg:space-y-2 text-center sm:text-start">
        <p>
          Your Password{" "}
          <span className="md:block text-[#FF2C2D]">- is your password.</span>{" "}
        </p>
      </div>
      <p className="text-gray-500">{bannerConstants.description}</p>
    </div>
  );

  return (
    <div className="flex flex-col space-y-14 md:flex-row w-full h-full bg-body justify-center items-center px-8 lg:px-14 xl:px-32 2xl:px-44 3xl:px-80 md:space-x-24 3xl:space-x-28">
      {getResponsiveBannerImage()}
      <div className="flex flex-col items-center md:items-start space-y-8">
        {bannerDetailsComponent}
        <div>
          <AnchorLink href={"/generate_password"}>
            <Button className="text-semibold">Get Started</Button>
          </AnchorLink>
        </div>
      </div>
    </div>
  );
}

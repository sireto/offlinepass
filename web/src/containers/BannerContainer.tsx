import Image from "next/image";
import BannerImage from "@app/assets/images/banner_image.png";
import { bannerConstants } from "@app/constants/banner-constants";
import Button from "@app/components/ui/button/button";
import AnchorLink from "@app/components/ui/links/anchor-link";

export default function BannerContainer() {
  const bannerDetailsComponent = (
    <div className="space-y-6 md:space-y-14">
      <div className="text-3xl lg:text-5xl font-medium space-y-2">
        <p>Your Password</p>
        <p className="pl-2">
          - is your <span className="text-[#FF2C2D]">password.</span>
        </p>
      </div>
      <p className="text-gray-500">{bannerConstants.description}</p>
    </div>
  );

  return (
    <div className="flex flex-col lg:flex-row w-full h-full py-14 bg-body justify-center items-center my-14 px-8 2xl:px-24 3xl:px-96  space-x-10 3xl:space-x-20">
      <Image src={BannerImage} alt={""} height={1000} width={400} />
      <div className="space-y-8">
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

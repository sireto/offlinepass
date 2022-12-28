import Image from "next/image";
import BannerImage from "@app/assets/images/banner_image.png";
import { bannerConstants } from "@app/constants/banner-constants";
import Button from "@app/components/ui/button/button";
import hmac from "js-crypto-hmac";
import bs58 from "bs58";
import AnchorLink from "@app/components/ui/links/anchor-link";

import { encryptedConstants, offlineConstants, recoverableConstant } from "@app/constants/benifits";
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
    <div className="flex flex-col lg:flex-row w-full h-full bg-body justify-center items-center my-14 px-16 2xl:px-24 sm:space-y-14 space-x-10 3xl:space-x-20">
      <Image src={BannerImage} alt={""} height={700} width={300} />
      <div className="space-y-8">
        {bannerDetailsComponent}
        <AnchorLink href={"/generate_password"}>
          <Button className="text-semibold mt-5">Get Started</Button>
        </AnchorLink>
      </div>
    </div>
  );
}

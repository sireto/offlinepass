import Image from "next/image";
import BannerImage from "@app/assets/images/banner_image.png";
import { bannerConstants } from "@app/constants/banner-constants";
import Button from "@app/components/ui/button/button";
import hmac from "js-crypto-hmac";
import bs58 from "bs58";

import { encryptedConstants, offlineConstants, recoverableConstant } from "@app/constants/benifits";
export default function BannerContainer() {
  const hmacSha256 = () => {
    const msg = "facebook.com | abc@gmail.com | 2022-01-01 | 0"; // Uint8Array of arbitrary length
    const keyString = "H@rdPassw0rd"; // Uint8Array of 32 bytes (since SHA-256 is used)
    const hash = "SHA-256";
    const retries = 0;
    const keyUnit8Array = new TextEncoder().encode(keyString);
    const msgUnit8Array = new TextEncoder().encode(msg);
    hmac.compute(keyUnit8Array, msgUnit8Array, hash).then((mac: any) => {
      // now you get a keyed-hash of msg in Uint8Array
      console.log(`${retries}$${bs58.encode(mac)}`);
      //   console.log(new TextDecoder("utf-8").decode(mac));
    });
  };

  const BannerDetails = () => (
    <div className="space-y-14">
      <div className="text-5xl font-medium space-y-2">
        <p>Your Password</p>
        <p className="pl-2">
          - is your <span className="text-[#FF2C2D]">password.</span>
        </p>
      </div>
      <p className="text-gray-500">{bannerConstants.description}</p>
    </div>
  );

  return (
    <div className="flex flex-col md:flex-row bg-body justify-center items-center h-full w-full">
        <Image src={BannerImage} alt={""} height={1000} width={400} />
        <div className="space-y-8">
          <BannerDetails />
          <Button onClick={hmacSha256} className="text-semibold">
            Get Started
          </Button>
        </div>
    </div>
  );
}

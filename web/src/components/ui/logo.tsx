import BrandLogo from "@app/assets/images/brandlogo.png";

import Image from "next/image";
import AnchorLink from "@app/components/ui/links/anchor-link";
import { customLoader } from "@app/components/customloader";

export default function Logo() {
  return (
    <AnchorLink
      href={"/"}
      className="flex items-center font-Chau_Philomene_One space-x-4"
    >
      <Image src={BrandLogo} loader={customLoader} alt={""} height={40} width={60} />
      <div>
        <p className="font-medium text-3xl ">
          Offline<span className="text-brand">Pass</span>
        </p>
        <p className="text-xs mt-1">Self Service Password Manager</p>
      </div>
    </AnchorLink>
  );
}

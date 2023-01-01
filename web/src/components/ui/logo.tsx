import BrandLogo from "@app/assets/images/brandlogo.png";

import Image from "next/image";
import AnchorLink from "@app/components/ui/links/anchor-link";

export default function Logo() {
  return (
    <AnchorLink
      href={"/"}
      className="flex items-center font-Chau_Philomene_One space-x-4"
    >
      <Image src={BrandLogo} alt={""} height={40} width={40} />
      <div>
        <p className="font-medium text-2xl sm:text-3xl">
          Offline<span className="text-brand">Pass</span>
        </p>
        <p className="text-xs mt-1">Self Service Password Manager</p>
      </div>
    </AnchorLink>
  );
}

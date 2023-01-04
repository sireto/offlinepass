import BrandLogo from "@app/assets/images/brandlogo.png";

import Image from "next/image";
import AnchorLink from "@app/components/ui/links/anchor-link";
import { customLoader } from "@app/utils/customLoaderUtils";

export default function Logo() {
  return (
    <AnchorLink
      href={"/"}
      className="flex flex-col items-center font-Chau_Philomene_One space-x-4"
    >
      <p className="font-medium text-2xl sm:text-3xl text-black">
        Offline<span className="text-brand">Pass</span>
      </p>
      <p className="text-xs mt-1">Self Service Password Manager</p>
    </AnchorLink>
  );
}

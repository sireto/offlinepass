import AnchorLink from "@app/components/ui/links/anchor-link";
import { Lock } from "../icons/lock";

export default function Logo() {
  return (
    <AnchorLink
      href={"/"}
      className="flex px-4 text-xl lg:text-2xl  items-center font-medium"
    >
      <Lock className="h-5 w-5 lg:h-6 lg:w-6 text-brand" />
      <span className="text-brand">fflinePass</span>
      {/* <p className="font-medium text-2xl sm:text-3xl text-black">
        Offline<span className="text-brand">Pass</span>
      </p>
      <p className="text-xs mt-1 text-black">Self Service Password Manager</p> */}
    </AnchorLink>
  );
}

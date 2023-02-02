import AnchorLink from "@app/components/ui/links/anchor-link";
import { Lock } from "../icons/lock";

export default function Logo() {
  return (
    <AnchorLink
      href={"/"}
      className="flex text-xl lg:text-2xl  items-center font-medium"
    >
      <Lock className="h-5 w-5 lg:h-6 lg:w-6 text-brand" />
      <span className="text-brand">fflinePass</span>
    </AnchorLink>
  );
}

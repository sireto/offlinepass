import AnchorLink from "@app/components/ui/links/anchor-link";
import { Lock } from "@app/components/icons/lock";
import cn from "classnames";
export default function Logo({ className }) {
  return (
    <AnchorLink
      href={"/"}
      className={cn(
        "flex text-xl lg:text-2xl  items-center font-medium",
        className
      )}
    >
      <Lock className="h-5 w-5 lg:h-6 lg:w-6 text-brand" />
      <span className="text-brand">fflinePass</span>
    </AnchorLink>
  );
}

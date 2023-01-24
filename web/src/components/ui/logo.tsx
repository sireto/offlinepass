import AnchorLink from "@app/components/ui/links/anchor-link";

export default function Logo() {
  return (
    <AnchorLink
      href={"/"}
      className="flex flex-col font-Chau_Philomene_One px-4"
    >
      <p className="font-medium text-2xl sm:text-3xl text-black">
        Offline<span className="text-brand">Pass</span>
      </p>
      <p className="text-xs mt-1 text-black">Self Service Password Manager</p>
    </AnchorLink>
  );
}

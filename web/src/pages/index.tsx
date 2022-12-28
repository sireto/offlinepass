import BannerContainer from "@app/containers/BannerContainer";
import BenifitsContainer from "@app/containers/BenifitsContainer";
export default function Home() {
  return (
    <div className="flex flex-col px-8 2xl:px-24 py-20 space-y-32 sm:space-y-64 ">
      <BannerContainer />
      <BenifitsContainer />
    </div>
  );
}

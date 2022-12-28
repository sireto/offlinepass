import BannerContainer from '@app/containers/BannerContainer';
import BenifitsContainer from '@app/containers/BenifitsContainer';
export default function Home() {
    return (
        <div className='flex flex-col px-8 2xl:px-24 space-y-20' >
            <BannerContainer />
            <BenifitsContainer/>
        </div>
    );
}

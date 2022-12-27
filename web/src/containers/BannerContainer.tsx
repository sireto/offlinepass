import Image from 'next/image';
import BannerImage from '@app/assets/images/banner_image.png';
import { bannerConstants } from '@app/constants/banner-constants';
import Button from '@app/components/ui/button/button';

export default function BannerContainer() {
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
        <div className="flex flex-col md:flex-row w-full h-full bg-body justify-center items-center px-8 2xl:px-24 3xl:px-80 my-32 space-x-20">
            <Image src={BannerImage} alt={''} height={1000} width={400} />
            <div className="space-y-8">
                <BannerDetails />
                <Button className="text-semibold">Get Started</Button>
            </div>
        </div>
    );
}
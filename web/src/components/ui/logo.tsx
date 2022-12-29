import BrandLogo from '@app/assets/images/brand_logo.png';

import Image from 'next/image';
import AnchorLink from './links/anchor-link';

export default function Logo() {
    return (
        <AnchorLink href={'/'} className="flex items-center space-x-4">
            <Image src={BrandLogo} alt={''} height={40} width={40} />
            <div>
            <p className="font-medium text-2xl">Offline Pass</p>
            <p className="text-xs">Self Service Password Manager</p>
            </div>
        </AnchorLink>
    );
}

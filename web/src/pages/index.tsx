import BannerContainer from '@app/containers/BannerContainer';
import BenifitsContainer from '@app/containers/BenifitsContainer';
const bip39 = require('bip39')
export default function Home() {
    const mnemonic = bip39.generateMnemonic()
    console.log(mnemonic);
    console.log(bip39.mnemonicToEntropy(mnemonic))
    return (
        <div className='flex flex-col px-8 2xl:px-24 3xl:px-80 space-y-20' >
            <BannerContainer />
            <BenifitsContainer/>
        </div>
    );
}

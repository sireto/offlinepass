import '../../styles/globals.css';
import '../../styles/tailwind.css';
import type { AppProps } from 'next/app';
import Layout from '../layouts/_layout';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <Layout>
            <Component {...pageProps} />
        </Layout>
    );
}

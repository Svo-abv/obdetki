import Head from 'next/head';

interface IHeadPage {
    title: string;
    description: string;
}
export default function HeadPage(props: IHeadPage) {
    const { title, description } = props;
    return (
        <Head>
            <title>{title}</title>
            < meta name="description" content={description} />
        </Head>
    );
};
const Custom404 = () => {
    return <h1>404 - Page Not Found</h1>
}

export default Custom404;

export async function getStaticProps(context: any) {
    return {
        props: {}, // will be passed to the page component as props
    }
}

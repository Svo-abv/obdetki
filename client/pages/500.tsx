const Custom500 = () => {
    return <h1>500 - Server-side error occurred</h1>
}

export default Custom500;

export async function getStaticProps(context: any) {
    return {
        props: {}, // will be passed to the page component as props
    }
}

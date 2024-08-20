export async function load({ parent }) {
    // get the layoutData
    const { layoutData } = await parent();

    return {
        props: {
            layoutData,
        },
    };
}

export const getNftName = (ogName: string, edition: number) => {
    // generate a name from:
    //    the old item name
    //    mint edition
    const name = `Manifest: "${ogName}" number ${edition}`;
    return name;
};

export const getNftDescription = (
    ogCollectionName: string,
    ogTokenName: string,
    ogTokenId: string,
    edition: number,
) => {
    const description = `This is a Manifest Art creation, edition ${edition}.\n  Original Collection: ${ogCollectionName}\n  Original Token Name: ${ogTokenName}\n  Original Token Id: ${ogTokenId}`;
    return description;
};

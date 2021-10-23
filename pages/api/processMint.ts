import type { NextApiRequest, NextApiResponse } from 'next'
import { SaveWebhookParams } from 'types'
import { getNftName, getNftDescription } from './utils';
import Moralis from 'moralis/node';

export default async (req: NextApiRequest, res: NextApiResponse<Response>) => {
    Moralis.start({
        appId: process.env.MORALIS_APPLICATION_ID!,
        serverUrl: process.env.MORALIS_SERVER_ID!
        
    });

    if (req.method !== 'POST') { 
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
    const params: SaveWebhookParams = req.body;

    const {
        ogAddress,
        ogTokenId,
        newTokenId,
    } = params.object; // this is the object stored in db from mint event

    const options = { 
        address: ogAddress,
        token_id: ogTokenId,
    };

    const tokenIdMetadata = await Moralis.Web3API.token.getTokenIdMetadata(options);

    const {
        metadata,
        name: ogCollectionName,
        token_uri: ogTokenUri,
    } = tokenIdMetadata;

    const metadataObj = metadata && JSON.parse(metadata);
    const ogTokenName = metadataObj.name;
    // how do calculate edition? have to look up how many are in DB with ogAddress & ogTokenId

    // query largest edition and add one for given ogAddress ogTokenId

    const query = new Moralis.Query('uriData');
    const pipeline = [
        { match: { ogC: ogAddress, ogT: ogTokenId } },
        { group: { objectId: undefined, max: { $max: '$edition' } } },
    ];

    let maxEdition;
    await query.aggregate(pipeline)
        .then(function(results) {
            maxEdition = results[0].max;
        })
        .catch(function(error) {
            // There was an error.
        });

    const edition = maxEdition + 1 || 1; 

    // get NFT ID number of manifests of this type
    // want to create a name from the old name and the new ID number
    const name = getNftName(ogTokenName, edition);
    const description = getNftDescription(ogCollectionName, ogTokenName, ogTokenId, edition);

    const uriData = new Moralis.Object('uriData');
    const imageData = '';

    uriData.set('tokenId', newTokenId);
    uriData.set('ogC', ogAddress);
    uriData.set('ogT', ogTokenId);
    uriData.set('ogUri', ogTokenUri);
    uriData.set('n', name);
    uriData.set('d', description);
    uriData.set('i', imageData);
    uriData.set('edition', edition);

    await uriData.save();
    res.status(200);
}
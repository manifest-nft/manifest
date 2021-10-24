import type { NextApiRequest, NextApiResponse } from 'next'
import { UriData } from 'types'
import Moralis from 'moralis/node';

export default async (req: NextApiRequest, res: NextApiResponse<UriData>) => {
    Moralis.start({
        appId: process.env.MORALIS_APPLICATION_ID!,
        serverUrl: process.env.MORALIS_SERVER_ID!
        
    });

    const { query: { id, contractAddress } } = req;

    const query = new Moralis.Query('uriData');
    query.equalTo('tokenId', id);
    const objects = await query.find();

    if (objects.length > 0) { 
        const first = objects[0];
        const returnObj = {
            tokenId: first.get('tokenId'),
            ogC: first.get('ogC'),
            ogT: first.get('ogT'),
            ogUri: first.get('ogUri'),
            name: first.get('name'),
            description: first.get('description'),
            image: first.get('image'),
            edition: first.get('edition'),
        };
        res.status(200).json(returnObj);
    } else {
        res.status(404);
    }
}

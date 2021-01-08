import { NextApiRequest, NextApiResponse } from "next";

interface IdNextApiRequest extends NextApiRequest {
    query: {
        id?: string
    }
}

export default function echo(req: IdNextApiRequest, res: NextApiResponse) {
    // res.statusCode = 200;
    // res.setHeader('Content-Type', 'application/json');
    // res.end(req.query.id)
    res.json({ id: req.query.id });

}
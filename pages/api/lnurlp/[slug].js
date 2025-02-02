import { runMiddleware, corsMiddleware } from "@/utils/middleware";

const BACKEND_URL = process.env.BACKEND_URL

export default async function handler(req, res) {
    await runMiddleware(req, res, corsMiddleware);

    const { slug } = req.query

    if (!slug || slug === 'undefined') {
        res.status(404).json({ error: 'Not found' })
        return
    }

    if (slug === 'ttooccooll') {
        const metadata = [
            ["text/plain", "Sample LN-ADDRESS endpoint"]
        ];

        res.status(200).json({ 
            callback: `${BACKEND_URL}/api/callback/ttooccooll`,
            maxSendable: 10000000000,
            minSendable: 1000,
            metadata: JSON.stringify(metadata),
            tag: 'payRequest'
        })
        return
    }
}
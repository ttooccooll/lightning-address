import axios from "axios"
import crypto from "crypto"
import { runMiddleware, corsMiddleware } from "@/utils/middleware";

const BACKEND_URL = process.env.BACKEND_URL

export default async function handler(req, res) {
    await runMiddleware(req, res, corsMiddleware);

    const { slug, ...queryParams } = req.query

    if (slug === 'ttooccooll') {
        if (queryParams.amount) {
            const metadata = [
                ["text/plain", "Sample LN-ADDRESS endpoint"]
            ];

            const metadataString = JSON.stringify(metadata);

            const hash = crypto.createHash('sha256').update(metadataString).digest('hex');

            const descriptionHash = Buffer.from(hash, 'hex').toString('base64');

            const value = parseInt(queryParams.amount) / 1000

            if (value < 1) {
                res.status(400).json({ error: 'Amount too low' })
                return
            } else {
                axios.post(`${BACKEND_URL}/api/lnd`, { amount: value, description_hash: descriptionHash })
                    .then(function (response) {
                        res.status(200).json({ pr: response.data })
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        } else {
            res.status(400).json({ error: 'Amount not specified' })
            return
        }
    }
}
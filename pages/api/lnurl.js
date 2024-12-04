import { runMiddleware, corsMiddleware } from "@/utils/middleware";

export default async function handler(req, res) {
    await runMiddleware(req, res, corsMiddleware);

    const metadata = [
        ["text/plain", "Sample LN-ADDRESS endpoint"]
    ];
    const response = {
        callback: `${process.env.BACKEND_URL}/api/callback/ttooccooll`,
        maxSendable: 10000000000,
        minSendable: 1000,
        metadata: JSON.stringify(metadata),
        tag: "payRequest"
    };
    res.status(200).json(response);
}

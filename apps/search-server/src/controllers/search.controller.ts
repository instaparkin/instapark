import { axios, logger, Request, Response } from "@instapark/utils";

export const handleQuery = async (req: Request, res: Response) => {
    const { query_by } = req.params;

    logger.info(query_by);

    if (!query_by) {
        res.status(400).json({ message: "query_by parameter is required" });
        return;
    }

    axios.post(
        `http://localhost:8108/multi_search?query_by=${query_by}`,
        req.body, {
        headers: {
            'x-typesense-api-key': "xyz",
        }
    }).then((response) => {
        res.status(200).json(response.data);
    }).catch((error) => {
        res.status(502).json({
            message: "Failed to fetch data",
            error: error,
        });
    })

};

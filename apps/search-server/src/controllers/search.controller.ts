import { axios, logger, Request, Response, sendResponse } from "@instapark/utils";

export const handleQuery = async (req: Request, res: Response) => {
    const { query_by } = req.params;

    logger.info(query_by);

    console.log(req.query);
    
    sendResponse(res, 200, "Queries Received", "SUCCESS", req.query)

};

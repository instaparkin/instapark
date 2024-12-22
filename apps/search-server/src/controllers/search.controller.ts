export const handleQuery = async (req, res) => {
    const { query_by } = req.params;

    console.log(query_by);
    
    console.log(req.body);
    
    if (!query_by) {
        return res.status(400).json({ message: "query_by parameter is required" });
    }

    try {
        const response = await fetch(
            `http://localhost:8108/multi_search?query_by=${query_by}`,
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'x-typesense-api-key': "xyz",
                },
                body: JSON.stringify(req.body),
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${data.message || response.statusText}`);
        }

        res.status(200).json(data);
    } catch (error) {
        console.error("Error during handleQuery:", error.message);
        res.status(502).json({
            message: "Failed to fetch data",
            error: error.message,
        });
    }
};

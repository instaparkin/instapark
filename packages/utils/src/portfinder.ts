import { getPortPromise } from "portfinder";

export const portFinder = async (startPort: number) => {
    return await getPortPromise({
        startPort,
        stopPort: 8090
    })
        .then((port) => {
            return port
        })
        .catch((err) => {
            throw err
        });
}

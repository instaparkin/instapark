import supertokens from "supertokens-node";

export async function getUserFromId(userId: string) {
    try {
        const userInfo = await supertokens.getUser(userId)
        return userInfo
    } catch (error) {
        console.log(error);
    }
}
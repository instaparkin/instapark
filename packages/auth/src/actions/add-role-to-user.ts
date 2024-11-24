import UserRoles from "supertokens-node/recipe/userroles";

export async function addRoleToUser(userId: string, role: string) {
    const response = await UserRoles.addRoleToUser("public", userId, role);

    if (response.status === "UNKNOWN_ROLE_ERROR") {
        console.log("Role does not exist");
        return;
    }

    if (response.didUserAlreadyHaveRole === true) {
        console.log("The user already had the role");        
    }
}
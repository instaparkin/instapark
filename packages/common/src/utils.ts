/**
 * Return the Environment
 * @returns
 */
export function getEnv() {
  return process.env.NODE_ENV === "production" ? "production" : "development";
}

/**
* Converts a UUID to an alphanumeric string.
*/
export function uuidToAlphanumeric(uuid: string): string {
  if (!/^[0-9a-fA-F-]{36}$/.test(uuid)) {
    throw new Error("Invalid UUID format");
  }
  return Buffer.from(uuid.replace(/-/g, ""), "hex").toString("base64url");
}

/**
 * Converts an alphanumeric string back to a UUID.
 */
export function alphanumericToUuid(alphanumeric: string): string {
  if (!/^[A-Za-z0-9_-]{22,24}$/.test(alphanumeric)) {
    throw new Error("Invalid alphanumeric format");
  }
  const hex = Buffer.from(alphanumeric, "base64url").toString("hex");
  return (
    hex.slice(0, 8) +
    "-" +
    hex.slice(8, 12) +
    "-" +
    hex.slice(12, 16) +
    "-" +
    hex.slice(16, 20) +
    "-" +
    hex.slice(20)
  );
}

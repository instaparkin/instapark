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
  if (!/^[0-9a-fA-F-]{36}$/.test(uuid)) throw new Error("Invalid UUID format");

  const hex = uuid.replace(/-/g, ""); // Remove hyphens
  const binary = String.fromCharCode(...hex.match(/.{1,2}/g)!.map((b) => parseInt(b, 16)));

  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, ""); // Base64 URL encoding
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

/**
 * Function to generate the google maps link
 * @param destinationLat
 * @param destinationLng
 * @param sourceLat
 * @param sourceLng
 * @returns
 */
export function generateGoogleMapsLink(
  destinationLat: number,
  destinationLng: number,
  sourceLat?: number,
  sourceLng?: number
): string {
  const isValidLat = (lat: number): boolean => lat >= -90 && lat <= 90;
  const isValidLng = (lng: number): boolean => lng >= -180 && lng <= 180;

  let mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${destinationLat},${destinationLng}`;

  if (sourceLat !== undefined && sourceLng !== undefined && isValidLat(sourceLat) && isValidLng(sourceLng)) {
      mapsUrl += `&origin=${sourceLat},${sourceLng}`;
  }

  return mapsUrl;
}

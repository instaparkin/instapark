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
const BASE62_CHARS = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

function base62Encode(buffer: Uint8Array): string {
  let value = BigInt("0x" + Buffer.from(buffer).toString("hex"));
  let encoded = "";
  const base = BigInt(62);

  while (value > 0) {
    encoded = BASE62_CHARS[Number(value % base)] + encoded;
    value /= base;
  }

  return encoded.padStart(22, "0"); // Ensure consistent length
}

export function uuidToAlphanumeric(uuid: string): string {
  if (!/^[0-9a-fA-F-]{36}$/.test(uuid)) throw new Error("Invalid UUID format");

  const hex = uuid.replace(/-/g, ""); // Remove hyphens
  const bytes = Buffer.from(hex, "hex"); // Convert hex to bytes

  return base62Encode(bytes); // Base62 encoding
}


/**
 * Converts an alphanumeric string back to a UUID.
 */
function base62Decode(encoded: string): Uint8Array {
  let value = BigInt(0);
  const base = BigInt(62);

  for (const char of encoded) {
    value = value * base + BigInt(BASE62_CHARS.indexOf(char));
  }

  const hex = value.toString(16).padStart(32, "0"); // Ensure full 32 hex characters
  return Buffer.from(hex, "hex");
}

export function alphanumericToUuid(alphanumeric: string): string {
  if (!/^[A-Za-z0-9]{22}$/.test(alphanumeric)) {
    throw new Error("Invalid alphanumeric format");
  }

  const bytes = base62Decode(alphanumeric);
  const hex = bytes.toString();

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

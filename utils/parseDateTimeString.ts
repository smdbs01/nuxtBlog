/**
 * Converts an ISO string to a formatted local date and time string.
 *
 * @param isoString - the ISO string to convert
 * @returns the formatted local date and time string
 */
export default function (isoString: string): string {
  const date = new Date(isoString);

  // Extract date and time components
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Month is 0-based
  const day = date.getDate().toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  // Create the formatted local date and time string
  const localTimeString = `${year}-${month}-${day} ${hours}:${minutes}`;

  return localTimeString;
}

/**
 * Truncates text to a specified maximum length, appending a suffix if truncated.
 * @param text - The text to truncate
 * @param maxLength - Maximum length of the resulting string (including suffix)
 * @param suffix - Suffix to append when text is truncated (default: "...")
 * @returns The truncated text with suffix, or original text if within limit
 */
export function truncateText(
  text: string,
  maxLength: number,
  suffix: string = "..."
): string {
  if (text.length <= maxLength) {
    return text;
  }
  return text.substring(0, maxLength - suffix.length) + suffix;
}

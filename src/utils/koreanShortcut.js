/**
 * Korean shortcut matching utility
 * Matches Korean shortcuts where users input first letters of each word
 * Example: "장공" matches "장갑 공격력 주문서"
 */

/**
 * Extract first characters from Korean text
 * @param {string} text - Korean text to extract from
 * @returns {string} - First characters of each word
 */
function extractKoreanShortcut(text) {
  if (!text) return "";

  // Split by spaces and special characters, then take first character of each word
  return text
    .split(/[\s\-\(\)\[\]\/]+/) // Split by space, dash, parentheses, brackets, slash
    .filter((word) => word.length > 0) // Remove empty strings
    .map((word) => word.charAt(0)) // Get first character of each word
    .join(""); // Join together
}

/**
 * Check if query matches Korean shortcut pattern
 * @param {string} itemName - Full item name
 * @param {string} query - User search query
 * @returns {boolean} - Whether query matches shortcut pattern
 */
export function matchesKoreanShortcut(itemName, query) {
  if (!itemName || !query) return false;

  const shortcut = extractKoreanShortcut(itemName);
  const normalizedQuery = query.replace(/\s+/g, ""); // Remove spaces from query

  // Check if item shortcut starts with the query
  return shortcut.startsWith(normalizedQuery);
}

/**
 * Enhanced search function that includes Korean shortcut matching
 * @param {Array} items - Array of item objects with nameKorean property
 * @param {string} query - Search query
 * @returns {Array} - Filtered items
 */
export function searchWithKoreanShortcut(items, query) {
  if (!query || !items) return [];

  const normalizedQuery = query.toLowerCase().replace(/\s+/g, "");

  return items.filter((item) => {
    const normalizedName = item.nameKorean.replace(/\s+/g, "").toLowerCase();

    // English prefix matching (existing functionality)
    const englishPrefix =
      item.nameKorean.match(/^[a-zA-Z]+/)?.[0]?.toLowerCase() || "";

    return (
      normalizedName.includes(normalizedQuery) || // Original name matching
      (englishPrefix && normalizedQuery.startsWith(englishPrefix)) || // English prefix matching
      matchesKoreanShortcut(item.nameKorean, query) // Korean shortcut matching
    );
  });
}

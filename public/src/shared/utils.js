/**
 * @param {string} string
 * @returns {string}
 */
export function stripIndent(string) {
  const match = string.match(/^[ \t]*(?=\S)/gm)?.filter((m) => m);

  if (!match) {
    return string;
  }

  const indent = Math.min(...match.map((m) => m.length));
  const re = new RegExp(`^[ \\t]{${indent}}`, "gm");

  return string.replace(re, "");
}

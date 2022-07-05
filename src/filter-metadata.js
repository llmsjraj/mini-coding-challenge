/*
type Metadata = {
  url: string | null;
  siteName: string | null;
  title: string | null;
  description: string | null;
  keywords: string[] | null;
  author: string | null;
};
*/

/**
 * Filters the given Metadata array to only include the objects that match the given search query.
 * If the search query has multiple words,
 * treat each word as a separate search term to filter by,
 * in addition to gathering results from the overall query.
 * If the search query has special characters,
 * run the query filter with the special characters removed.
 * Can return an empty array if no Metadata objects match the search query.
 * @param {Metadata[]} metadata - An array of Metadata objects
 * @param {string} query - The search query string
 * @returns {Metadata[]} - An array of Metadata objects that match the given search query
 */
export default function filterMetadata(metadata, query) {
  const results = [];
  if (!metadata || (typeof query === "undefined" && query === null)) {
    return results;
  }
  if (
    !(typeof query === "string" || query instanceof String) ||
    !(metadata instanceof Array)
  ) {
    return results;
  }

  const toSearch = query.replace(/-/gi, ",").replace(/[^a-zA-Z ,]/gi, "");
  const regexList = [];
  const searchWords = toSearch.split(/[ ,]+/);
  searchWords.forEach((word) => {
    regexList.push(new RegExp(word, "i"));
  });

  metadata.forEach((obj) => {
    let matched = false;
    Object.keys(obj).forEach((key) => {
      if (obj[key] !== null) {
        regexList.forEach((re) => {
          if (re.test(`${obj[key]}`.replace(/[^\w\s]/gi, ""))) {
            matched = true;
          }
        });
      }
    });
    if (matched) {
      results.push(obj);
      matched = false;
    }
  });

  return results;
}

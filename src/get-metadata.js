// Note: Please do not use JSDOM or any other external library/package (sorry)
/*
type Metadata = {
  url: string;
  siteName: string;
  title: string;
  description: string;
  keywords: string[];
  author: string;
};
*/

/**
 * Gets the URL, site name, title, description, keywords, and author info out of the <head> meta tags from a given html string.
 * 1. Get the URL from the <meta property="og:url"> tag.
 * 2. Get the site name from the <meta property="og:site_name"> tag.
 * 3. Get the title from the the <title> tag.
 * 4. Get the description from the <meta property="og:description"> tag or the <meta name="description"> tag.
 * 5. Get the keywords from the <meta name="keywords"> tag and split them into an array.
 * 6. Get the author from the <meta name="author"> tag.
 * If any of the above tags are missing or if the values are empty, then the corresponding value will be null.
 * @param html The complete HTML document text to parse
 * @returns A Metadata object with data from the HTML <head>
 */
export default function getMetadata(html) {
  let url = null;
  let siteName = null;
  let title = null;
  let description = null;
  let keywords = null;
  let author = null;
  if (!html || !(typeof html === "string" || html instanceof String)) {
    return {
      url,
      siteName,
      title,
      description,
      keywords,
      author,
    };
  }
  const regexUrl = html.match(/<meta\s+property="og:url"\s+content="(.*)"/i);
  const regexSiteName = html.match(
    /<meta\s+property="og:site_name"\s+content="(.*)"/i
  );
  const regexTitle = html.match(/<title>(.*)<\/title>/i);
  const regexDescription = html.match(
    /<meta\s+property="og:description"\s+content="(.*)"/i
  );
  const regexDescription1 = html.match(
    /<meta\s+name="description"\s+content="(.*)"/i
  );
  const regexKeywords = html.match(/<meta\s+name="keywords"\s+content="(.*)"/i);
  const regexAuthor = html.match(/<meta\s+name="author"\s+content="(.*)"/i);
  if (regexUrl) {
    url = regexUrl[1] || "";
  }
  if (regexSiteName) {
    siteName = regexSiteName[1] || "";
  }
  if (regexTitle) {
    title = regexTitle[1] || "";
  }
  if (regexDescription) {
    description = regexDescription[1] || "";
  }
  if (regexDescription1) {
    description = regexDescription1[1] || "";
  }
  if (regexKeywords) {
    keywords = regexKeywords[1] || "";
  }
  if (regexAuthor) {
    author = regexAuthor[1] || "";
  }
  if (keywords === "") {
    keywords = [];
  } else if (keywords != null) {
    keywords = keywords.split(",");
  }
  return {
    url,
    siteName,
    title,
    description,
    keywords,
    author,
  };
}

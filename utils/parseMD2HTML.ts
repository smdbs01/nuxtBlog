import markdownit from "markdown-it";
import { light as emoji } from "markdown-it-emoji";
import sub from "markdown-it-sub";
import sup from "markdown-it-sup";
import fn from "markdown-it-footnote";
import container from "markdown-it-container";

import hljs from "highlight.js";

const mdi = markdownit({
  linkify: true,
  typographer: true,
  highlight: function (str: string, lang: string) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(str, { language: lang }).value;
      } catch (__) {}
    }
    return "";
  },
})
  .use(emoji)
  .use(sub)
  .use(sup)
  .use(fn)
  .use(container, "warning");

/**
 * Converts markdown to HTML.
 *
 * @param md - the markdown string to convert
 */
export default async function (md: string): Promise<string> {
  return mdi.render(md);
}

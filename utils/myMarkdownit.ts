// @ts-nocheck too many un-typed imports
import markdownit, { type Token } from "markdown-it";
import Shiki from "@shikijs/markdown-it";
import { full as emoji } from "markdown-it-emoji";
import sub from "markdown-it-sub";
import sup from "markdown-it-sup";
import fn from "markdown-it-footnote";
import container from "markdown-it-container";
import katex from "@iktakahiro/markdown-it-katex";
import anchor from "markdown-it-anchor";
import toc from "markdown-it-toc-done-right";
import slugify from "@sindresorhus/slugify";

const mdi = markdownit({
  linkify: true,
  typographer: true,
})
  .use(
    await Shiki({
      themes: {
        light: "ayu-dark",
        dark: "ayu-dark",
      },
    })
  )
  .use(emoji)
  .use(sub)
  .use(sup)
  .use(fn)
  .use(container, "warning")
  .use(katex)
  .use(anchor, {
    level: [1, 2, 3],
    slugify: (s) => slugify(s),
    permalink: anchor.permalink.ariaHidden({
      placement: "before",
    }),
  })
  .use(toc, {
    level: [1, 2, 3],
    slugify: (s) => slugify(s),
  });

const proxy = (tokens, idx, options, env, self) =>
  self.renderToken(tokens, idx, options);

const defaultHeadingOpenRenderer = mdi.renderer.rules.heading_open || proxy;
mdi.renderer.rules.heading_open = (tokens, idx, options, env, self) => {
  return `${defaultHeadingOpenRenderer(
    tokens,
    idx,
    options,
    env,
    self
  )}<span class="heading">`;
};

const defaultHeadingCloseRenderer = mdi.renderer.rules.heading_close || proxy;
mdi.renderer.rules.heading_close = (tokens, idx, options, env, self) => {
  return `</span>${defaultHeadingCloseRenderer(
    tokens,
    idx,
    options,
    env,
    self
  )}`;
};

/**
 * Parses a given markdown string to HTML.
 *
 * @param {string} md - The markdown string to be parsed
 * @return {string} The HTML representation of the parsed markdown
 */
export const parseMD2HTML = (md: string): string => {
  try {
    return mdi.render(md);
  } catch (e) {
    return "<h2>Failed to parse markdown</h2><p><b>" + e + "</b></p>";
  }
};

/**
 * Parses the given Markdown content to HTML and includes a table of contents.
 *
 * @param {string} md - The Markdown content to be parsed
 * @return {string} The HTML content with a table of contents
 */
export const parseMD2HTMLWithTOC = (md: string): string => {
  return mdi.render("[[toc]]\n" + md);
};

/**
 * Truncates a given markdown string to a specified length.
 *
 * @param {string} md - the markdown string to truncate
 * @param {number} length - the maximum length of the truncated string
 * @return {string} the truncated markdown string
 */
export const truncateMarkdown = (md: string, length: number): string => {
  const tokens = mdi.parse(md, {});

  const parseInline = (token: Token, curLength: number = 100) => {
    let ret = "";
    for (const child of token.children) {
      if (child.type === "text") {
        for (const word of child.content.split(" ")) {
          ret += word;
          if (ret.length >= length) {
            break;
          }
          ret += " ";
        }
      } else if (child.type === "inline") {
        ret += parseInline(child, curLength + ret.length);
      }

      if (ret.length + curLength >= length) {
        break;
      }
    }
    return ret;
  };

  let content = "";

  for (const token of tokens) {
    if (token.type === "inline") {
      content += parseInline(token, content.length);
      if (content.length >= length) {
        break;
      }
    }
  }

  return content;
};

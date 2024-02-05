// @ts-nocheck too many un-typed imports
import markdownit, { type Token } from "markdown-it";
// import hljs from "highlight.js";
import Shiki from "@shikijs/markdown-it";
import { light as emoji } from "markdown-it-emoji";
import sub from "markdown-it-sub";
import sup from "markdown-it-sup";
import fn from "markdown-it-footnote";
import container from "markdown-it-container";
import anchor from "markdown-it-anchor";
import toc from "markdown-it-toc-done-right";
import slugify from "@sindresorhus/slugify";
import twemoji from "twemoji";

const mdi = markdownit({
  linkify: true,
  typographer: true,
  // highlight: function (str, lang) {
  //   if (lang && hljs.getLanguage(lang)) {
  //     try {
  //       return hljs.highlight(str, { language: lang }).value;
  //     } catch (__) {}
  //   }
  //   return "";
  // },
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

mdi.renderer.rules.emoji = function (token, idx) {
  return twemoji.parse(token[idx].content);
};

// const proxy = (tokens, idx, options, env, self) => {
//   self.renderToken(tokens, idx, options);
// };
// const defaultImageRenderer = markdownit().renderer.rules.image || proxy;

// const nuxtImgPlugin = (markdown) => {
//   markdown.renderer.rules.image = (tokens, idx, options, env, self) => {
//     tokens[idx].tag = "NuxtImg";
//     return defaultImageRenderer(tokens, idx, options, env, self);
//   };
// };

// mdi.use(nuxtImgPlugin);

export const parseMD2HTML = (md: string) => {
  return mdi.render(md);
};

export const parseMD2HTMLWithTOC = (md: string) => {
  return mdi.render("[[toc]]\n" + md);
};

export const truncateMarkdown = (md: string, length: number) => {
  const tokens = mdi.parse(md, {});

  const parseInline = (token: Token, curLength: number = 100) => {
    let ret = "";
    for (const child of token.children) {
      if (child.type === "text") {
        ret += child.content;
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
      content += "\n";
    }
  }

  return content;
};

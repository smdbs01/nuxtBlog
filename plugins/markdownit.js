import markdownit from "markdown-it";
import hljs from "highlight.js";
import { light as emoji } from "markdown-it-emoji";
import sub from "markdown-it-sub";
import sup from "markdown-it-sup";
import fn from "markdown-it-footnote";
import container from "markdown-it-container";
import anchor from "markdown-it-anchor";
import toc from "markdown-it-toc-done-right";
import slugify from "@sindresorhus/slugify";

export default defineNuxtPlugin(() => {
  const mdi = markdownit({
    linkify: true,
    typographer: true,
    highlight: function (str, lang) {
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

  return {
    provide: {
      parseMD2HTML: function (md) {
        return mdi.render("[[toc]]\n" + md);
      },
    },
  };
});

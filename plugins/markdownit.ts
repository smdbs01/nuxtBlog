// @ts-nocheck
import markdownit from "markdown-it";
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

// eslint-disable-next-line no-undef
export default defineNuxtPlugin(async () => {
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

  return {
    provide: {
      parseMD2HTML: function (md: string) {
        return mdi.render("[[toc]]\n" + md);
      },
    },
  };
});

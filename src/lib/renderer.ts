import MarkdownIt from "markdown-it";
import { katex } from "@mdit/plugin-katex";
import markdownItShiki from "@shikijs/markdown-it";
import { sha256 } from "js-sha256";
import type { ShikiTransformer } from "shiki";
import theme from "./theme.json";

function mditHeaderPlugin(md: MarkdownIt) {
  const headingRenderer =
    md.renderer.rules.heading_open ||
    function (tokens, idx, options, env, self) {
      return self.renderToken(tokens, idx, options);
    };
  md.renderer.rules.heading_open = function (tokens, idx, options, env, self) {
    const level = tokens[idx].tag;
    const rawTitle = tokens[idx + 1].content;
    let title = rawTitle;
    if (rawTitle.startsWith("! ")) {
      title = rawTitle.slice(2);
      tokens[idx].attrPush(["class", "super-header"]);
    }
    title = "#".repeat(parseInt(level.slice(1))) + " " + title;
    tokens[idx + 1].content = title;
    tokens[idx + 1].children![0].content = title;
    return headingRenderer(tokens, idx, options, env, self);
  };
}

declare global {
  interface ShikiTransformerContextMeta {
    addHash?: boolean;
  }
}

function shikiHashPlugin(): ShikiTransformer {
  return {
    name: "shiki-checksum-plugin",
    line(hast, line) {
      if (!this.options.meta?.__raw?.includes("hash")) {
        return hast;
      }
      hast.properties = hast.properties || {};
      const content = this.source.split("\n")[line - 1];
      if (this.source.split("\n").length === line && !content) {
        return hast;
      }
      const hash = sha256(content.replace(/[ \t]/g, "")).slice(0, 4);
      hast.properties["data-shiki-hash"] = hash;
      return hast;
    },
  };
}

const grayscale = false;
export const md = new MarkdownIt()
  .use(katex)
  .use(
    await markdownItShiki({
      langs: ["cpp", "python"],
      theme: grayscale ? (theme as any) : "vitesse-light",
      transformers: [shikiHashPlugin()],
    }),
  )
  .use(mditHeaderPlugin);

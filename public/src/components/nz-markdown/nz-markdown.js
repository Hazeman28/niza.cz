import { marked } from "https://cdn.jsdelivr.net/npm/marked@11.2.0/lib/marked.esm.js";
import { stripIndent } from "/src/shared/utils.js";

/** @type {CustomElementDefinition<"nz-markdown">} */
export const definition = {
  name: "nz-markdown",
  moduleUrl: import.meta.url,
  init({ shadowRoot, slots }) {
    const article = shadowRoot.querySelector("article");

    const string = slots.default
      .map((node) => stripIndent(node.textContent.trim()))
      .filter(Boolean)
      .join("\n");

    const parsedMarkdown = marked.parse(string);

    article.innerHTML = parsedMarkdown;
  },
};

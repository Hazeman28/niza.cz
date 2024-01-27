"use strict";

/**
 * @param {string} string
 * @returns {string}
 */
function stripIndent(string) {
  const match = string.match(/^[ \t]*(?=\S)/gm)?.filter((m) => m);

  if (!match) {
    return string;
  }

  const indent = Math.min(...match.map((m) => m.length));
  const re = new RegExp(`^[ \\t]{${indent}}`, "gm");

  return string.replace(re, "");
}

/**
 * @this {HTMLElement}
 * @param {ShadowRoot} shadowRoot
 * @param {HTMLButtonElement} tab
 * @param {boolean} toggle
 */
function toggleShadowRootTab(tab, toggle) {
  const panelId = tab.getAttribute("aria-controls");

  if (!panelId) {
    return;
  }

  const panel = this.shadowRoot.getElementById(panelId);

  if (!panel) {
    return;
  }

  panel.hidden = !toggle;

  tab.ariaSelected = String(toggle);
  tab.tabIndex = toggle ? 0 : -1;
}

/**
 * @this {HTMLElement}
 * @param {SlotMap} slots
 */
function renderShadowRootTabButtons(slots) {
  const tabList = this.shadowRoot.querySelector(`[role="tablist"]`);

  if (!tabList) {
    return;
  }

  const { default: result, html, css, js } = slots;

  const languageSlots = { html, css, js };

  const resultTabPanel = this.shadowRoot.querySelector(`#demo-result`);

  const filteredResult = result.filter(
    (node) => node instanceof HTMLElement || node.textContent.trim()
  );

  if (filteredResult.length === 0 && resultTabPanel) {
    resultTabPanel.innerHTML = "";
    resultTabPanel.append(...Object.values(languageSlots).flat());
  }

  for (const [key, nodes] of Object.entries(languageSlots)) {
    if (nodes.length === 0) {
      continue;
    }

    const tabButton = document.createElement("button");

    const [tabId, tabPanelId] = [`demo-${key}-tab`, `demo-${key}`];

    const tabPanel = this.shadowRoot.getElementById(tabPanelId);

    if (!tabPanel) {
      continue;
    }

    tabButton.role = "tab";
    tabButton.ariaSelected = "false";
    tabButton.id = tabId;
    tabButton.tabIndex = -1;
    tabButton.textContent = key.toUpperCase();

    tabButton.setAttribute("aria-selected", "false");
    tabButton.setAttribute("aria-controls", tabPanelId);

    tabList.appendChild(tabButton);

    tabPanel.setAttribute("aria-labelledby", tabId);

    const stringifiedNodes = nodes
      .map((node) => {
        if (node instanceof HTMLElement) {
          return ["css", "js"].includes(key) ? node.innerHTML : node.outerHTML;
        }

        return node.textContent;
      })
      .filter(Boolean)
      .join("\n");

    const highlight = hljs.highlight(stripIndent(stringifiedNodes.trim()), {
      language: key === "html" ? "xml" : key,
    });

    const code = document.createElement("code");
    code.innerHTML = highlight.value;

    tabPanel.innerHTML = "";
    tabPanel.appendChild(code);
  }
}

/** @type {CustomElementDefinition<"nz-demo">} */
export const definition = {
  name: "nz-demo",
  moduleUrl: import.meta.url,
  init({ shadowRoot, slots }) {
    const toggleTab = toggleShadowRootTab.bind(this);
    const renderTabButtons = renderShadowRootTabButtons.bind(this);

    renderTabButtons(slots);

    const tabs = /** @type {NodeListOf<HTMLButtonElement>} */ (
      shadowRoot.querySelectorAll("button[id$=-tab]")
    );

    for (const tab of tabs) {
      tab.addEventListener("click", function () {
        toggleTab(this, true);

        tabs.forEach((tab) => {
          tab !== this ? toggleTab(tab, false) : undefined;
        });
      });
    }
  },
};

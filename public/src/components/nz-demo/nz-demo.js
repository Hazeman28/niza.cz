"use strict";

/** @type {CustomElementDefinition<"nz-demo">} */
export const definition = {
  name: "nz-demo",
  moduleUrl: import.meta.url,
  init({ shadowRoot, slots }) {
    const toggleTab = toggleShadowRootTab.bind(this);
    const renderTabButtons = renderShadowRootTabButtons.bind(this);

    const copyButton = shadowRoot.querySelector("nz-copy");

    if (!copyButton) {
      console.error("Could not find copy button.");
      return;
    }

    const tabs = renderTabButtons(slots);

    for (const [tab, formattedCode] of tabs) {
      tab.addEventListener("click", function () {
        toggleTab(this, true);

        copyButton.dataset.text = formattedCode;

        tabs.forEach(([tab]) => {
          tab !== this ? toggleTab(tab, false) : undefined;
        });
      });
    }
  },
};

/**
 * @this {HTMLElement}
 * @param {SlotMap} slots
 * @returns {[button: HTMLButtonElement, formattedCode: string][]}
 */
function renderShadowRootTabButtons(slots) {
  const tabList = this.shadowRoot.querySelector(`[role="tablist"]`);
  const resultTab = this.shadowRoot.querySelector(`#demo-result-tab`);

  if (!tabList || !resultTab) {
    console.error("Could not find tab list or result tab.");
    return;
  }

  /** @type {[button: HTMLButtonElement, formattedCode: string][]} */
  const tabs = [[resultTab, ""]];

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

    tabButton.type = "button";
    tabButton.role = "tab";
    tabButton.ariaSelected = "false";
    tabButton.id = tabId;
    tabButton.textContent = key.toUpperCase();

    tabButton.setAttribute("aria-selected", "false");
    tabButton.setAttribute("aria-controls", tabPanelId);

    tabList.appendChild(tabButton);

    tabPanel.setAttribute("aria-labelledby", tabId);

    const stringifiedNodes = nodes
      .map((node) => {
        if (node instanceof HTMLElement) {
          return node.innerHTML;
        }

        return node.textContent;
      })
      .filter(Boolean)
      .join("\n");

    const formattedCode = stripIndent(stringifiedNodes.trim());

    const highlight = hljs.highlight(formattedCode, {
      language: key === "html" ? "xml" : key,
    });

    const code = document.createElement("code");
    code.innerHTML = highlight.value;

    tabPanel.innerHTML = "";
    tabPanel.appendChild(code);

    tabs.push([tabButton, formattedCode]);
  }

  return tabs;
}

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
}

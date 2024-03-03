/** @type {CustomElementDefinition<"nz-timeline">} */
export const definition = {
  name: "nz-timeline",
  moduleUrl: import.meta.url,
  init({ slots }) {
    const items = /** @type {HTMLElement[]} */ (
      slots.default.filter(
        (node) =>
          node.nodeType === Node.ELEMENT_NODE &&
          node.localName === "nz-timeline-item"
      )
    );

    items.forEach((item, index) => {
      item.toggleAttribute("line", index < items.length - 1);
    });
  },
};

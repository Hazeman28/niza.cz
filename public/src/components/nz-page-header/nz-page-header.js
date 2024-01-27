/** @type {CustomElementDefinition<"nz-page-header">} */
export const definition = {
  name: "nz-page-header",
  moduleUrl: import.meta.url,
  attributeMap: {
    header: {
      style() {
        const color = this.attributes.getNamedItem("color")?.value;
        return color ? `--base-color: ${color}` : "";
      },
    },
  },
  init({ shadowRoot }) {
    const homeLink = shadowRoot.querySelector("a.home-link");

    if (location.pathname === "/") {
      homeLink.hidden = true;
    }
  },
};

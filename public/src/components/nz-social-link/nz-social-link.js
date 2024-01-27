/** @type {CustomElementDefinition<"nz-social-link">} */
export const definition = {
  moduleUrl: import.meta.url,
  name: "nz-social-link",
  attributeMap: {
    a: {
      href: true,
      "aria-label": true,
    },
  },
};

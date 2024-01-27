/** @type {CustomElementDefinition<"nz-link-button">} */
export const definition = {
  name: "nz-link-button",
  moduleUrl: import.meta.url,
  attributeMap: {
    a: {
      href: true,
      target: true,
      rel: true,
    },
  },
};

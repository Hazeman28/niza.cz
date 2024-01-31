/** @type {CustomElementDefinition<"nz-counter">} */
export const definition = {
  name: "nz-counter",
  moduleUrl: import.meta.url,
  init({ shadowRoot }) {
    let count = -1;
    const button = shadowRoot.querySelector("button");

    const increment = () => {
      count++;
      button.textContent = `Count: ${count}`;
    };

    increment();
    button.onclick = increment;
  },
};

/** @type {CustomElementDefinition<"nz-counter">} */
export const definition = {
  name: "nz-counter",
  moduleUrl: import.meta.url,
  init({ shadowRoot }) {
    let count = 0;

    const button = shadowRoot.querySelector("button");

    function setCount() {
      button.textContent = `Count: ${count}`;
    }

    button.addEventListener("click", () => {
      count++;
      setCount();
    });

    setCount();
  },
};

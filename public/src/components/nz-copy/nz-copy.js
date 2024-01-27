/** @type {CustomElementDefinition<"nz-copy">} */
export const definition = {
  name: "nz-copy",
  moduleUrl: import.meta.url,
  init({ shadowRoot }) {
    const checkIcon = shadowRoot.querySelector("icon-check");
    const clipboardIcon = shadowRoot.querySelector("icon-clipboard");

    const button = shadowRoot.querySelector("button");

    if (!button) {
      console.error("Could not find button.");
      return;
    }

    if (!checkIcon || !clipboardIcon) {
      console.error("Could not find icons.");
      return;
    }

    checkIcon.hidden = true;

    button.addEventListener("click", async () => {
      const copyText = this.dataset.text;

      if (!copyText) {
        return;
      }

      try {
        await navigator.clipboard.writeText(copyText);

        checkIcon.hidden = false;
        clipboardIcon.hidden = true;

        setTimeout(() => {
          checkIcon.hidden = true;
          clipboardIcon.hidden = false;
        }, 3000);
      } catch (error) {
        console.error(error);
      }
    });
  },
};

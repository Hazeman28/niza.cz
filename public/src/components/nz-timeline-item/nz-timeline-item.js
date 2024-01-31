const PRESENT_KEYWORD = "Present";

/** @type {CustomElementDefinition<"nz-timeline-item">} */
export const definition = {
  name: "nz-timeline-item",
  moduleUrl: import.meta.url,
  init({ shadowRoot }) {
    let { periodStart, periodEnd } = this.dataset;

    const summary = shadowRoot.querySelector("summary");

    if (!periodStart) {
      throw new Error("Missing periodStart dataset.");
    }

    periodStart = new Date(periodStart);
    periodEnd = periodEnd ? new Date(periodEnd) : PRESENT_KEYWORD;

    const dateTimeFormatter = new Intl.DateTimeFormat("en", {
      year: "numeric",
      month: "short",
    });

    const formattedPeriodStart = dateTimeFormatter.format(periodStart);
    const formattedPeriodEnd =
      periodEnd === PRESENT_KEYWORD
        ? periodEnd
        : dateTimeFormatter.format(periodEnd);

    const p = document.createElement("p");

    p.textContent = `${formattedPeriodStart} - ${formattedPeriodEnd}`;
    p.classList.add("period");

    summary.append(p);
  },
};

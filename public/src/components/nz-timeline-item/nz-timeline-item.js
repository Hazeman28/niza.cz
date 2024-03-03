import dayjs from "https://cdn.skypack.dev/dayjs@1.11.10";
import dayjsDuration from "https://cdn.skypack.dev/dayjs@1.11.10/plugin/duration";
import relativeTime from "https://cdn.skypack.dev/dayjs@1.11.10/plugin/relativeTime";

dayjs.extend(dayjsDuration);
dayjs.extend(relativeTime);

const PRESENT_KEYWORD = "Present";

/** @type {CustomElementDefinition<"nz-timeline-item">} */
export const definition = {
  name: "nz-timeline-item",
  moduleUrl: import.meta.url,
  init({ shadowRoot }) {
    let periodStart = this.getAttribute("period-start");
    let periodEnd = this.getAttribute("period-end");

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

    const duration = dayjs.duration(
      dayjs(periodEnd).diff(dayjs(periodStart), "ms")
    );

    const durationInYears = duration.asYears();

    const p = document.createElement("p");
    const time = document.createElement("time");

    p.textContent = `${formattedPeriodStart} - ${formattedPeriodEnd}`;

    time.textContent = `(${durationInYears.toFixed(1)} year${
      durationInYears > 1 ? "s" : ""
    })`;

    time.dateTime = duration.toISOString();

    p.append(time);
    p.classList.add("period");

    summary.append(p);
    summary.toggleAttribute("data-line", this.hasAttribute("line"));
  },
};

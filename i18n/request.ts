import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale as (typeof routing.locales)[number])) {
    locale = routing.defaultLocale;
  }

  let messages;
  if (locale === "it") {
    messages = (await import("../messages/it.json")).default;
  } else {
    messages = (await import("../messages/en.json")).default;
  }

  return {
    locale,
    messages,
  };
});
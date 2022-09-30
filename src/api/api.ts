import { Configuration, DefaultApi } from "@xwmtp/bingo-tournament";
import { websiteSettings } from "../Settings";

export const getXXsrfToken = () =>
  document.cookie.replace(/(?:(?:^|.*;\s*)XSRF-TOKEN\s*\=\s*([^;]*).*$)|^.*$/, "$1");

export const getApi: () => DefaultApi = () => {
  throw Error("API disabled");
  return new DefaultApi(
    new Configuration({
      basePath: websiteSettings.BACKEND_URL,
      credentials: "include",
      headers: {
        "X-XSRF-TOKEN": getXXsrfToken(),
      },
    })
  );
};

export const extractTwitchChannel = (url: string) => {
  return url.replace("https://", "").replace("www.", "").replace("twitch.tv/", "");
};

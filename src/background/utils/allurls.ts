

export function getUrls(list: string[]) {
  const result = [];

  for (const url of list) {
    result.push(`www.${url}`);
    result.push(`${url}`);
  }

  return result;
}

const bannedAllTimes = [
  "twitter.com",
  "instagram.com",
  "aniwatch.to",
  "netflix.com",
  "netflix.ca",
];
const youtubeChannels = [
  "@danny"
]
const tempBanned = [
  "eneyida.tv",
  "facebook.com",
  "facebook.ca",
];
export async function getTempBanned() {
  const additionalUrls: string[] = await new Promise(res => chrome.storage.local.get(["additionalUrls"], data => res(data.additionalUrls)));

  if (additionalUrls && (!Array.isArray(additionalUrls) || (additionalUrls.length > 0 && typeof additionalUrls[0] != "string"))) {
    return [];
  }

  return getUrls([...tempBanned, ...(additionalUrls || [])]);
}
export async function getBanned() {

  return getUrls(bannedAllTimes);
}
export function isBannedYoutubeChannel(url: string) {
  console.log("THE HTML", document.querySelector("#primary-inner #text > a[href='/@danny']")?.innerHTML)
  if (document.querySelector("#primary-inner #text > a[href='/@danny']")) {
    return true
  }
  for (const channel of youtubeChannels) {
    if (url.includes(channel)) {
      return true;
    }
  }
  return false;
}
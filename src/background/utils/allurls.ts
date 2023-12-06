

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
];
const tempBanned = [
  "eneyida.tv",
  "netflix.com",
  "netflix.ca",
  "facebook.com",
  "facebook.ca",
];
export async function getTempBanned() {
  const additionalUrls: string[] = await new Promise(res => chrome.storage.local.get(["additionalUrls"], data => res(data.additionalUrls)));

  console.log(additionalUrls);

  if (additionalUrls && (!Array.isArray(additionalUrls) || (additionalUrls.length > 0 && typeof additionalUrls[0] != "string"))) {
    return [];
  }

  return getUrls([...tempBanned, ...additionalUrls]);
}
export async function getBanned() {

  return getUrls(bannedAllTimes);
}


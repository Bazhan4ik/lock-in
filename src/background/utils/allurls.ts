

export function getUrls(list: string[]) {
  const result = [];

  for (const url of list) {
    result.push(`www.${url}`);
    result.push(`${url}`);
  }

  return result;
}

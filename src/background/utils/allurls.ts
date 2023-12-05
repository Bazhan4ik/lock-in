

export function getUrls(list: string[]) {
  const result = [];

  for (const url of list) {
    result.push(`${url}.com`);
    result.push(`${url}.ca`);
    result.push(`www.${url}.com`);
  }

  return result;
}

import { getBanned, getTempBanned, getUrls } from "./utils/allurls";


let banned: string[] = null!;
let tempBanned: string[] = null!;


chrome.tabs.onCreated.addListener((tab) => {
  console.log("TAB OPENED");

  checkTab(tab);
});

chrome.tabs.onUpdated.addListener((tabId: number, changeInfo: chrome.tabs.TabChangeInfo, tab: chrome.tabs.Tab) => {
  if (changeInfo.status == "complete") {
    checkTab(tab);
  }
});


chrome.runtime.onMessage.addListener(async (req: any, sender: chrome.runtime.MessageSender, sendResponse) => {
  if (req.action == "enterLockedInMode") {
    chrome.tabs.query({}, (tabs: chrome.tabs.Tab[]) => {
      tabs.forEach((tab) => {
        checkTab(tab);
      })
    });
  } else if (req.action == "updateUrls") {
    banned = await getBanned();
    tempBanned = await getTempBanned();
  }
});


async function checkTab(tab: chrome.tabs.Tab) {

  console.log("ALL TIME BANNED", banned);

  if (!banned || !tempBanned) {
    banned = await getBanned();
    tempBanned = await getTempBanned();
  }

  if (tab.url && banned.includes(new URL(tab.url).hostname)) {
    if (await chrome.tabs.get(tab.id!)) {
      chrome.tabs.remove(tab.id!);
    }
  } else if (await isLockedIn() && tab.url && tempBanned.includes(new URL(tab.url).hostname)) {
    if (await chrome.tabs.get(tab.id!)) {
      chrome.tabs.remove(tab.id!);
    }
  }



}


function isLockedIn() {
  return new Promise((res, rej) => {
    chrome.storage.local.get(["lockedIn"], (result) => {
      console.log("LOCKED IN:", result);
      res(result.lockedIn);
    });
  });
}

console.log('hello world from background')

export { }

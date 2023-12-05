import { getUrls } from "./utils/allurls";

chrome.runtime.onInstalled.addListener(async (opt) => {
  // if (opt.reason === 'install') {
  //   await chrome.storage.local.clear()

  //   chrome.tabs.create({
  //     active: true,
  //     url: chrome.runtime.getURL('./installed.html'),
  //   })
  // }

  // if (opt.reason === 'update') {
  //   chrome.tabs.create({
  //     active: true,
  //     url: chrome.runtime.getURL('./src/update/index.html'),
  //   })
  // }
});

const bannedAllTimes = [
  "twitter",
  "instagram",
];

const lockInBanMode = [
  "netflix",
]

const banned = getUrls(bannedAllTimes);
const lockInBan = getUrls(lockInBanMode);



chrome.tabs.onCreated.addListener((tab) => {
  console.log("TAB OPENED");

  checkTab(tab);
});

chrome.tabs.onUpdated.addListener((tabId: number, changeInfo: chrome.tabs.TabChangeInfo, tab: chrome.tabs.Tab) => {
  if (changeInfo.status == "complete") {
    checkTab(tab);
  }
});


chrome.runtime.onMessage.addListener((req: any, sender: chrome.runtime.MessageSender, sendResponse) => {
  if (req.action == "enterLockedInMode") {
    chrome.tabs.query({}, (tabs: chrome.tabs.Tab[]) => {
      tabs.forEach((tab) => {
        checkTab(tab);
      })
    });
  }
});


async function checkTab(tab: chrome.tabs.Tab) {

  console.log("ALL TIME BANNED", banned);

  if (tab.url && banned.includes(new URL(tab.url).hostname)) {
    if (await chrome.tabs.get(tab.id!)) {
      chrome.tabs.remove(tab.id!);
    }
  } else if (await isLockedIn() && tab.url && lockInBan.includes(new URL(tab.url).hostname)) {
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

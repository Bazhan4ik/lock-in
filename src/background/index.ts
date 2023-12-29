import { getBanned, getTempBanned, getUrls, isBannedYoutubeChannel } from "./utils/allurls";


let banned: string[] = null!;
let tempBanned: string[] = null!;


chrome.tabs.onCreated.addListener((tab) => {
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
  } else if (req.action == "closeTab") {
    console.log("HELLO")
    if (sender?.tab?.id && await chrome.tabs.get(sender.tab.id)) {
      chrome.tabs.remove(sender.tab.id);
    }
  }
});


async function checkTab(tab: chrome.tabs.Tab) {

  if (!banned || !tempBanned) {
    banned = await getBanned();
    tempBanned = await getTempBanned();
  }

  if (!tab.url) {
    return;
  }

  const url = new URL(tab.url);


  if (banned.includes(url.hostname)) {
    if (await chrome.tabs.get(tab.id!)) {
      chrome.tabs.remove(tab.id!);
    }
  } else if (await isLockedIn() && tempBanned.includes(url.hostname)) {
    if (await chrome.tabs.get(tab.id!)) {
      chrome.tabs.remove(tab.id!);
    }
  }


  // else if (url.hostname == "www.youtube.com" && isBannedYoutubeChannel(url.toString())) {
  //   if (await chrome.tabs.get(tab.id!)) {
  //     chrome.tabs.remove(tab.id!);
  //   }
  // }



}


function isLockedIn() {
  return new Promise((res, rej) => {
    chrome.storage.local.get(["lockedIn"], (result) => {
      res(result.lockedIn);
    });
  });
}

console.log('hello from background')

export { }

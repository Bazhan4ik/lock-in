import './index.scss'

// const src = chrome.runtime.getURL('src/content-script/iframe/index.html')

// const iframe = new DOMParser().parseFromString(
//   `<iframe class="crx-iframe" style="overflow-y: hidden;" src="${src}"></iframe>`,
//   'text/html'
// ).body.firstElementChild

// if (iframe) {
//   document.body?.append(iframe)
// }

const url = new URL(document.URL);

if (url.hostname == "www.youtube.com") {
  const interval = setInterval(() => {
    const element: HTMLAnchorElement | null = document.querySelector("#primary-inner #text > a");

    if (element) {
      clearInterval(interval);

      if (element.href.includes("/@danny")) {
        console.log("HELLO")
        chrome.runtime.sendMessage({ action: "closeTab" });
      }
    }
  }, 1000)
}
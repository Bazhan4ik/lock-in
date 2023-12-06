<script setup lang="ts">

import { onMounted, ref } from "vue";

const lockedIn = ref(false);
const newWebsiteUrl = ref("");

onMounted(async () => {
  chrome.storage.local.get(["lockedIn"], (result) => {
    lockedIn.value = result.lockedIn;
  })
});

function changeLockedIn() {
  chrome.storage.local.set({ lockedIn: !lockedIn.value });
  lockedIn.value = !lockedIn.value;
  if (lockedIn.value) {
    chrome.runtime.sendMessage({ action: "enterLockedInMode" });
  }
}

async function addWebsite() {
  const existingUrls: string[] = await new Promise((res) => chrome.storage.local.get(["additionalUrls"], data => res(data.additionalUrls)));

  chrome.storage.local.set({ additionalUrls: [...(existingUrls || []), newWebsiteUrl.value] })

  newWebsiteUrl.value = "";

  chrome.runtime.sendMessage({ action: "updateUrls" });
}

</script>

<template>
  <header class="header">
    <h1>Lock in NOW</h1>
  </header>

  <!-- <RouterView></RouterView> -->
  <main>
    <div class="lockin">
      <div>
        Lock in
      </div>
      <button @click="changeLockedIn()" id="lock-in">
        {{ lockedIn ? "Unlock in" : "Lock in" }}
      </button>
    </div>
    <div class="add-website">
      <p>Add more websites</p>
      <div class="input">
        <input v-model="newWebsiteUrl" type="url">
        <button @click="addWebsite()">Add</button>
      </div>
    </div>
  </main>
</template>

<style scoped>
#lock-in {
  padding: 6px 0;
  width: 96px;
  border-radius: 12px;
  background-color: red;
  font-size: 18px;
  color: white;
}

.header {
  height: 52px;
  display: flex;
  align-items: center;
  padding: 0 12px;
}

h1 {
  font-size: 18px;
  font-weight: 700;
}

.lockin {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 24px;
}

.input {
  display: flex;
  align-items: center;
  justify-content: space-between;

}

.add-website p {
  font-size: 18px;
  font-weight: 700;
  padding: 0 12px;
}

.input input {
  height: 24px;
  background-color: rgb(199, 199, 199);
  border-radius: 6px;
  width: auto;
  color: black;
}
</style>

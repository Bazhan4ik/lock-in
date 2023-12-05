<script setup lang="ts">

import { onMounted, ref } from "vue";

const lockedIn = ref(false);

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
    <div class="list">

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

.lists {}
</style>

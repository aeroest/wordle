<script lang="ts" setup>
import type { Tile } from "@/utils";

defineProps<{ tile: Tile; focus: boolean }>();
</script>
<template>
  <div
    :class="[
      'bg-gray-600 text-red-300',
      { 'bg-green-500 text-indigo-200': tile.correctPos },
      { 'bg-yellow-400 text-indigo-200': !tile.correctPos && tile.correctChar },
    ]"
  >
    <span class="text"> {{ tile.value }}</span>
  </div>
</template>
<style scoped>
.tile-container {
  --color: #bbc5bb;
  --hightlight: #444444;
  height: calc(var(--game-height) / 5);
  width: calc(var(--game-width) / 5);
  border: 1px var(--hightlight) solid;
  /* background-color: var(--color); */
  place-items: center;
  line-height: 90px;
  text-align: center;
}

.text {
  font-size: 40px;
  color: black;
  text-transform: uppercase;
}
</style>

<script lang="ts" setup>
import Tile from "./Tile.vue";

defineProps<{
  row: Array<any>;
  focus: boolean;
  yPointer: number;
  index: number;
}>();
</script>
<template>
  <div :class="['container', { 'focused-row': focus }]">
    <tile
      class="tile"
      v-for="(tile, index) in row"
      :tile="tile"
      :focus="index === yPointer"
    />
  </div>
</template>
<style scoped>
.container {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-column-gap: 5px;
}

.tile {
  width: calc(var(--game-width) / 5);
}
</style>

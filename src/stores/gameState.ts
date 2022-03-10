import { defineStore } from "pinia";
import { tile, initRow } from '@/utils';

export const useGameState = defineStore({
  id: "gameState",
  state: () => ({
    currentTry: initRow(),
  }),
  actions: {
    resetCurrentTry() {
      this.currentTry = initRow();
    },
    setChar(cursorPos: number, char: string) {
      if (cursorPos === 0) this.resetCurrentTry();

      this.$state.currentTry[cursorPos] = { value: char };
    },
    deleteChar(cursorPos: number) {
      this.$state.currentTry[cursorPos - 1] = tile;
    },
  },
});

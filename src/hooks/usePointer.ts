import type { Wordle } from "@/app";
import { ref } from "vue";

export const usePointer = (wordle: Wordle) => {
  const currentPointer = ref([0, 0]);

  const incrColumn = () => {
    const [x, y] = currentPointer.value;
    if (y < wordle?.wordLengthLimit) currentPointer.value = [x, y + 1];
  };

  const decrColumn = () => {
    const [x, y] = currentPointer.value;
    // console.log('usePointer',val);
    if (y > 0) currentPointer.value = [x, y - 1];
  };

  const incrRow = () => {
    const { value: val } = currentPointer;
    if (val[0] < wordle.retryLimit - 1) {
      currentPointer.value = [val[0] + 1, 0];
    }
  };

  return {
    currentPointer,
    incrColumn,
    decrColumn,
    incrRow,
  };
};

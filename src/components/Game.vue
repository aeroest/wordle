<script lang="ts" setup>
import { inject, reactive, ref, unref, watch } from "vue";

import { useGameState } from "../stores/gameState";
import { useKeyboard } from "@/hooks/useKeyboard";
import { useWordValidation, type Stats } from "@/hooks/useWordValidation";

import type { WordValidity, Wordle } from "@/app";
import { initMatrix, type Tile } from "@/utils";
import TileRow from "./game/TileRow.vue";
import { usePointer } from "@/hooks/usePointer";
import { useValidation } from "@/hooks/useValidation";
import { useStats } from "@/hooks/useStats";

import { getStringFromCharArray } from "@/utils";

interface LocalState {
  matrix: Array<Array<Tile>>;
  retriesLeft: number;
  currentWord: string;
  stats: Stats;
}

const wordle: Wordle = inject("wordle") ?? {
  wordLengthLimit: 5,
  retryLimit: 5,
};

const state = useGameState();

const localState = reactive<LocalState>({
  matrix: initMatrix(),
  retriesLeft: wordle.retryLimit,
  currentWord: "",
  stats: {
    correctLetterCount: 0,
    correctPosCount: 0,
    incorrectLetterCount: 0,
    incorrectLetters: [],
    correctLetters: [],
    correctPos: [],
  },
});

// watch(
//   () => localState.stats,
//   (stats) => console.log(stats),
//   { deep: true }
// );

const { currentPointer, incrColumn, decrColumn, incrRow } = usePointer(wordle);
const { isKeyValid } = useValidation();

const backspace = () => {
  if (localState.retriesLeft === 0) return;
  state.deleteChar(currentPointer.value[1]);
  decrColumn();
};

const updateState = (input: string) => {
  state.setChar(currentPointer.value[1] - 1, input);
};

const updateStats = (stats: Stats): void => {
  const {
    correctLetterCount,
    correctPosCount,
    correctLetters,
    correctPos,
    incorrectLetterCount,
    incorrectLetters,
  } = stats;

  localState.stats.correctLetterCount += correctLetterCount;
  localState.stats.correctPosCount += correctPosCount;
  localState.stats.incorrectLetterCount += incorrectLetterCount;
  incorrectLetters.forEach((d) => localState.stats.incorrectLetters.push(d));
  localState.stats.incorrectLetters;
  correctLetters.forEach((d) => localState.stats.correctLetters.push(d));
  correctPos.forEach((d) => localState.stats.correctPos.push(d));
};

const { possibleWords } = useStats(localState.stats);

watch(possibleWords, (pWords) => {
  // console.log("possibleWords in Game", pWords);
}, {deep: true});

const validate = (word: string) => {
  const { xa, result, stats } = useWordValidation(word);

  const res = {
    xa,
    canUpdateState: false,
  };

  const { inDict, correct } = result;
  if (!inDict) {
    console.log("Not even a word");

    res.canUpdateState = false;
  } else if (correct) {
    console.log("Ayee you won!");
    updateStats(stats.value);
    localState.matrix[currentPointer.value[0]] = xa;
    res.canUpdateState = false;
  } else {
    updateStats(stats.value);
    // this simple true false won't work; need better
    localState.matrix[currentPointer.value[0]] = xa;
    res.canUpdateState = true;
  }

  return res;
};

const submit = () => {
  if (localState.retriesLeft === 0) {
    console.log("You're done. Cry now");
    return;
  }
  if (currentPointer.value[1] === wordle.wordLengthLimit) {
    const currArray = localState.matrix[currentPointer.value[0]];
    const word = getStringFromCharArray(currArray);

    const { canUpdateState } = validate(word);
    if (!canUpdateState) return;

    incrRow();
    if (localState.retriesLeft > 1) state.resetCurrentTry();
    localState.retriesLeft--;
  } else {
    console.warn("Word too small");
  }
};

const { currentInput } = useKeyboard(submit, backspace);

watch(
  () => state.currentTry,
  (currentTry) => (localState.matrix[currentPointer.value[0]] = currentTry),
  { deep: true }
);

watch(currentPointer, () => {
  // console.log(currentPointer.value);
});

const handleInput = (val?: string) => {
  if (!val) return;
  // hack to not update array.last value if already present
  // TODO
  const [_, y] = currentPointer.value;
  if (state.currentTry[y === 5 ? y - 1 : y].value.length) return;

  const valid = isKeyValid(val);
  if (!valid) return;

  incrColumn();
  updateState(val);
};

watch(currentInput, (val) => handleInput(val?.key));
</script>
<template>
  <div class="container">
    <tile-row
      v-for="(row, index) in localState.matrix"
      :key="`r-${index}`"
      :row="row"
      :index="index"
      :focus="index === currentPointer[0]"
      :y-pointer="currentPointer[1]"
    >
    </tile-row>
  </div>
</template>
<style scoped>
.container {
  height: var(--game-height);
  width: var(--game-width);
  display: grid;

  grid-row-gap: 5px;
}
.container > * {
  height: calc(var(--game-height) / 5);
}
</style>

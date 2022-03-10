import type { Tile } from "@/utils";
import { Oa, Ma } from "@/wordList/fiveLetter";
import { ref } from "vue";

interface StatsItem {
  letter: string;
  index: number;
}
export interface Stats {
  correctLetterCount: number;
  correctPosCount: number;
  incorrectLetterCount: number;
  incorrectLetters: Array<StatsItem>;
  correctLetters: Array<StatsItem>;
  correctPos: Array<StatsItem>;
}

const onePassAlgo = (xa: Array<Tile>, b: Array<string>) => {
  b.forEach((correctLetter, i) => {
    if (xa[i].value === correctLetter) {
      xa[i].correctChar = true;
      xa[i].correctPos = true;
    } else {
      xa.forEach((item, j) => {
        // No need to check the letters that have been gone over once
        if (j < i) return;

        if (item.value === correctLetter) {
          xa[j].correctChar = true;
          xa[j].correctPos = false;
        }
      });
    }
  });
  return xa;
};

const twoPassAlgo = (xa: Array<Tile>, b: Array<string>) => {
  let localB = [...b];
  // First pass
  b.forEach((char, index) => {
    if (xa[index].value === char) {
      xa[index].correctChar = true;
      xa[index].correctPos = true;
    }
  });

  // second pass

  // No need to check the correctPos chars, to keep them handy
  const indicesWithCorrectPos: any = [];
  xa.map((tile, i) => {
    if (tile.correctPos) indicesWithCorrectPos.push(i);
  });

  // We are splicing away the char that have been indexed, so they don't get counted multiple times
  let xxb = [...localB];
  xa.forEach((tile, i) => {
    if (tile.correctPos) return;

    localB = xxb;
    localB.forEach((char, j) => {
      if (indicesWithCorrectPos.includes(j)) return;
      else if (char === tile.value) {
        tile.correctChar = true;
        xxb.splice(j, 1);
      }
    });
  });
  return xa;
};

export const useWordValidation = (word: string) => {
  const stats = ref<Stats>({
    correctLetterCount: 0,
    correctPosCount: 0,
    incorrectLetterCount: 0,
    incorrectLetters: [],
    correctLetters: [],
    correctPos: [],
  });

  const answer = "label";
  let a: Array<string> = word.split("");
  const possibleWords = [];
  let xa: Array<Tile> = a.map((char) => ({
    value: char,
    correctChar: false,
    correctPos: false,
  }));
  const b = answer.split("");

  const result = {
    inDict: false,
    correct: false,
  };

  if (Oa.includes(word) || Ma.includes(word)) {
    result.inDict = true;
  }

  xa = twoPassAlgo(xa, b);

  xa.forEach((tile, index) => {
    if (tile.correctPos) {
      stats.value.correctPosCount++;
      stats.value.correctPos.push({
        letter: tile.value,
        index,
      });
    } else if (tile.correctChar) {
      stats.value.correctLetterCount++;
      stats.value.correctLetters?.push({
        letter: tile.value,
        index,
      });
    } else {
      stats.value.incorrectLetterCount++;
      stats.value.incorrectLetters.push({
        letter: tile.value,
        index,
      });
    }
  });

  let firstIncorrectEntry = xa.findIndex(
    (tile) => !tile.correctChar || !tile.correctPos
  );

  result.correct = firstIncorrectEntry === -1;

  return { result, xa, stats };
};

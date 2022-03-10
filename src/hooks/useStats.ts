import type { Stats } from "./useWordValidation";
import { Oa, Ma } from "@/wordList/fiveLetter";
import { ref, watch, type Ref } from "vue";
export const useStats = (
  stats: Stats
): { possibleWords: Ref<Array<string>> } => {
  const possibleWords = ref(Oa.splice(0, 10));
  possibleWords.value.push("label");
  possibleWords.value.push("babel");
  possibleWords.value.push("games");
  possibleWords.value.push("bruhh");
  //   const possibleWords = ref([...Oa, ...Ma]);

  watch(stats, (stats) => {
    const { correctLetters, correctPos, incorrectLetters } = stats;
    let temp = [...possibleWords.value];
    temp = possibleWords.value.filter((word, index) => {
      // First Pass
      // keep words that have correctPos letter and index, dump rest

      const charArr = word.split("");
      const isPossibleArr: any = [];

      correctPos.forEach((item) => {
        if (item.letter.toLowerCase() === charArr[item.index].toLowerCase())
          isPossibleArr.push(true);
        else isPossibleArr.push(false);
      });
      const isPossible = isPossibleArr.findIndex((val: boolean) => !val);
      return isPossible === -1;
    });

    temp = temp.filter((word) => {
      // if even 1 incorrect letter is found, remove word from array
      const charArr = word.split("");
      const letterArr = incorrectLetters.reduce((bin: any, currItem) => {
        bin.push(currItem.letter);
        return bin;
      }, []);
      const firstCommonLetter = charArr.find((char) =>
        letterArr.includes(char)
      );
      console.log(firstCommonLetter, letterArr);
      if (typeof firstCommonLetter === "string") return false;
      return true;
    });
    console.log("After 2nd pass", temp);
    possibleWords.value = temp;
    // console.log(temp.length);
  });
  return {
    possibleWords,
  };
};

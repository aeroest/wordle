export interface Wordle {
  wordLengthLimit: number;
  retryLimit: number;
}

export interface WordValidity {
  inDict: boolean;
  fullLength: boolean;
}

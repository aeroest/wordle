const wordSize = Number(import.meta.env.VITE_WORD_LENGTH_LIMIT);
const retryLimit = Number(import.meta.env.VITE_RETRY_LIMIT);

export interface Tile {
  value: string;
  correctPos?: boolean;
  correctChar?: boolean;
}

export const tile: Tile = (() => ({
  value: "",
}))();

export const initRow = (): Array<Tile> => new Array(wordSize).fill(tile);

export const initMatrix = (): Array<Array<Tile>> =>
  new Array(retryLimit).fill(initRow());

export const getValueFromTile = (tile: Tile) => tile.value;

export const getStringFromCharArray = (arr: Array<Tile>): string =>
  arr.reduce((acc: string, curr: Tile) => acc + getValueFromTile(curr), "");

export type LSLetter = "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H" | "I" | "J" | "K" | "L" | "M" |
  "N" | "O" | "P" | "Q" | "R" | "S" | "T" | "U" | "V" | "W" | "X" | "Y" | "Z";

export interface LSParams {
  axiom: string;
  rules: {
    [letter in LSLetter]?: string;
  };
  x?: number;
  y?: number;
  alpha?: number;
  theta: number;
  step: number;
  iterations: number;
}

export type LSVGPathAttributes = {
  [attr: string]: string | string[];
}

export type ComboLSVGPathAttributes = {
  [key: string]: LSVGPathAttributes;
}

export interface LSVGParams<P extends LSVGPathAttributes | ComboLSVGPathAttributes = LSVGPathAttributes> {
  width?: number;
  height?: number;
  padding?: number;
  pathAttributes?: P;
}

export interface LSVGData {
  minX: number;
  minY: number;
  width: number;
  height: number;
  pathData: string[];
}

export interface LSVGDataOptions {
  isMultiPath: boolean;
}

export function getSVGData(lsParams: LSParams, options?: LSVGDataOptions): LSVGData;

export function getSVGCode(lsParams: LSParams, svgParams?: LSVGParams): string;

export function getComboSVGCode(lsParamsMap: {[key: string]: LSParams}, svgParams?: LSVGParams<ComboLSVGPathAttributes>): string;

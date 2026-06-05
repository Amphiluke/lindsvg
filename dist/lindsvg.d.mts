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

export type LSParamsMap = {
  [key: string]: LSParams;
}

export type LSVGPathAttributes = {
  [attr: string]: string | string[];
}

export type LSVGPathAttributesMap = {
  [key: string]: LSVGPathAttributes;
}

export type LSVGTemplateFn = (options: {
  viewBox: [number, number, number, number];
  width: number;
  height: number;
  content: string;
}) => string;

export interface LSVGParams {
  width?: number;
  height?: number;
  padding?: number;
  pathAttributesMap?: LSVGPathAttributesMap;
  templateFn?: LSVGTemplateFn;
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

export function getSVGCode(lsParamsMap: LSParamsMap, svgParams?: LSVGParams): string;

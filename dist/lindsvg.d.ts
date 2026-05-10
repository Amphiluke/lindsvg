type LSLetter = "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H" | "I" | "J" | "K" | "L" | "M" |
  "N" | "O" | "P" | "Q" | "R" | "S" | "T" | "U" | "V" | "W" | "X" | "Y" | "Z";

export interface LSParams {
  axiom: string;
  rules: {
    [letter in LSLetter]?: string;
  };
  alpha: number;
  theta: number;
  step: number;
  iterations: number;
}

export interface LSVGParams {
  width?: number;
  height?: number;
  padding?: number;
  pathAttributes?: {
    [attr: string]: string | string[];
  };
}

interface LSVGData {
  minX: number;
  minY: number;
  width: number;
  height: number;
}

export function getSVGData(lsParams: LSParams): {pathData: string} & LSVGData;

export function getMultiPathSVGData(lsParams: LSParams): {multiPathData: string[]} & LSVGData;

export function getSVGCode(lsParams: LSParams, svgParams: LSVGParams): string;

export function getMultiPathSVGCode(lsParams: LSParams, svgParams: LSVGParams): string;

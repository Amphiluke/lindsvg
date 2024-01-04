/*
L-system author/source index:

* [AH] - Anthony Hanmer
* [AK] - A.V. Kalmykov
* [AM] - Adrian Mariano
* [HS] - Herb Savage
* [GT] - Gary Teachout
* [KP] - Ken Philip
* [MR] - Michael A. Rouse
* [PB] - Paul Bourke
* [PP] - from P. Prusinkiewicz & J. Hanan, 1989
* [SE] - SirEdvin
* [SF] - Spanky Fractal Database (https://web.archive.org/web/20160903112517/http://www.nahee.com/spanky/pub/fractals/lsystems/)
* [WM] - William McWorter

An asterisk (*) near the reference means that the original L-system parameters
were modified for optimisation purposes

I apologize to the authors of L-systems going without any attribution.
Any help with affiliation of those L-systems is appreciated.
*/

/**
 * Symbol of the L-system grammar’s alphabet
 * @typedef {"A"|"B"|"C"|"D"|"E"|"F"|"G"|"H"|"I"|"J"|"K"|"L"|"M"|"N"|"O"|"P"|"Q"|"R"|"S"|"T"|"U"|"V"|"W"|"X"|"Y"|"Z"} LSLetter 
 */

/**
 * L-system configuration
 * @typedef {Object} LSystem
 * @property {String} lid - Unique identifier and the name of the L-system
 * @property {String} axiom - Initial codeword for the L-system construction
 * @property {Object.<LSLetter, String>} rules - Production rules map
 * @property {Number} alpha - Initial azimuth (deg)
 * @property {Number} theta - Angle for a single “turn” command (deg)
 * @property {Number} iterations - Number of iterations required to produce the L-system
 * @property {Number} step - Length of a line for a single “draw forward” command (px)
 * @property {Object.<String, String|String[]>=} attributes - SVG attributes
 */

/**
 * L-system collection
 * @typedef {Object} LSCollection
 * @property {String} cid - Unique identifier and the name of the collection
 * @property {LSystem[]} items - L-systems included in the collection
 */

/** @type {LSCollection[]} */
export default [
  {
    cid: "Curves",
    items: [
      { // [PP]
        lid: "anklets of Krishna",
        axiom: "-X--X",
        rules: {
          F: "F",
          X: "XFX--XFX",
        },
        alpha: 0,
        theta: 45,
        iterations: 5,
        step: 10,
      },
      { // [WM]
        lid: "border",
        axiom: "XYXYXYX+XYXYXYX+XYXYXYX+XYXYXYX",
        attributes: {
          stroke: "sienna",
          "stroke-width": "1.5",
        },
        alpha: 0,
        theta: 90,
        step: 5,
        iterations: 3,
        rules: {
          X: "FX+FX+FXFY-FY-",
          Y: "+FX+FXFY-FY-FY",
        },
      },
      {
        lid: "chain",
        axiom: "F+F+F+F",
        rules: {
          F: "F+B-F-FFF+F+B-F",
          B: "BBB",
        },
        alpha: 0,
        theta: 90,
        iterations: 3,
        step: 4,
        attributes: {
          stroke: "darkgoldenrod",
          "stroke-width": "1.5",
        },
      },
      { // [WM]
        lid: "cross",
        axiom: "X",
        rules: {
          X: "FX+FX+FXFY-FY-",
          Y: "+FX+FXFY-FY-FY",
        },
        alpha: 0,
        theta: 90,
        iterations: 5,
        step: 4.5,
      },
      {
        lid: "curve",
        axiom: "F-F-F-F-",
        rules: {
          F: "FF-F-F-F-F-F+F",
        },
        alpha: 0,
        theta: 90,
        iterations: 4,
        step: 3.5,
      },
      { // [AM]
        lid: "fass 1",
        axiom: "-L",
        rules: {
          F: "F",
          L: "LF+RFR+FL-F-LFLFL-FRFR+",
          R: "-LFLF+RFRFR+F+RF-LFL-FR",
        },
        alpha: 0,
        theta: 90,
        step: 6,
        iterations: 4,
      },
      { // [AM]
        lid: "fass 2",
        axiom: "-L",
        alpha: 0,
        theta: 90,
        step: 7,
        iterations: 3,
        rules: {
          F: "F",
          L: "LFLF+RFR+FLFL-FRF-LFL-FR+F+RF-LFL-FRFRFR+",
          R: "-LFLFLF+RFR+FL-F-LF+RFR+FLF+RFRF-LFL-FRFR",
        },
      },
      { // [WM]
        lid: "frame",
        axiom: "YXY-YXY-YXY-YXY",
        rules: {
          X: "FX+FX+FXFYFX+FXFY-FY-FY-",
          Y: "+FX+FX+FXFY-FYFXFY-FY-FY",
        },
        alpha: 0,
        theta: 90,
        iterations: 3,
        step: 4,
      },
      {
        lid: "Gosper curve",
        axiom: "XF",
        rules: {
          F: "F",
          X: "X+YF++YF-FX--FXFX-YF+",
          Y: "-FX+YFYF++YF+FX--FX-Y",
        },
        alpha: 0,
        theta: 60,
        iterations: 4,
        step: 8,
      },
      { // [GT*]
        lid: "hex-7-b",
        axiom: "X",
        rules: {
          X: "-F++F-X-F--F+Y---F--F+Y+F++F-X+++F++F-X-F++F-X+++F--F+Y--",
          Y: "+F++F-X-F--F+Y+F--F+Y---F--F+Y---F++F-X+++F++F-X+++F--F+Y",
        },
        alpha: 0,
        theta: 30,
        iterations: 4,
        step: 5,
      },
      {
        lid: "Hilbert curve",
        axiom: "X",
        rules: {
          F: "F",
          X: "-YF+XFX+FY-",
          Y: "+XF-YFY-FX+",
        },
        alpha: 0,
        theta: 90,
        iterations: 6,
        step: 7,
      },
      {
        lid: "island",
        axiom: "F+F+F+F",
        rules: {
          F: "F+F-F-FFF+F+F-F",
        },
        alpha: 0,
        theta: 90,
        iterations: 3,
        step: 4,
      },
      {
        lid: "Koch’s curve",
        axiom: "F+F+F+F",
        rules: {
          F: "FF+F+F+F+F+F-F",
        },
        alpha: 0,
        theta: 90,
        iterations: 4,
        step: 3.5,
      },
      {
        lid: "Koch’s snowflake",
        axiom: "F++F++F",
        rules: {
          F: "F-F++F-F",
        },
        alpha: 0,
        theta: 60,
        iterations: 4,
        step: 5,
        attributes: {
          stroke: "deepskyblue",
          "stroke-width": "1.5",
        },
      },
      { // [WM]
        lid: "lace",
        axiom: "W",
        rules: {
          F: "F",
          W: "+++X--F--ZFX+",
          X: "---W++F++YFW-",
          Y: "+ZFX--F--Z+++",
          Z: "-YFW++F++Y---",
        },
        alpha: 180,
        theta: 30,
        iterations: 7,
        step: 4.5,
      },
      { // [PP]
        lid: "mango-tree foliage",
        axiom: "A---A",
        rules: {
          F: "F",
          B: "B",
          A: "B-F+Z+F-BA",
          Z: "F-FF-F--[--Z]F-FF-F--F-FF-F--",
        },
        alpha: 0,
        theta: 60,
        iterations: 7,
        step: 15,
      },
      {
        lid: "meander",
        axiom: "A",
        rules: {
          A: "CCDEEGA",
          C: "FF+++++++++++++++",
          D: "F+++++++++++++++",
          E: "F---------------",
          F: "F",
          G: "FF--------------",
        },
        alpha: 0,
        theta: 6,
        iterations: 61,
        step: 10,
        attributes: {
          stroke: "sienna",
          "stroke-width": "4",
          "stroke-linecap": "square",
        },
      },
      {
        lid: "Moore curve",
        axiom: "LFL+F+LFL",
        rules: {
          F: "F",
          L: "-RF+LFL+FR-",
          R: "+LF-RFR-FL+",
        },
        alpha: 90,
        theta: 90,
        iterations: 5,
        step: 7,
      },
      { // [WM]
        lid: "Moore’s curl",
        axiom: "X",
        rules: {
          X: "FX+FX+FXFYFX+FXFY-FY-FY-",
          Y: "+FX+FX+FXFY-FYFXFY-FY-FY",
        },
        alpha: 180,
        theta: 90,
        iterations: 4,
        step: 3.5,
      },
      { // [AM]
        lid: "Peano curve",
        axiom: "F",
        rules: {
          F: "F-F+F+F+F-F-F-F+F",
        },
        alpha: 45,
        theta: 90,
        iterations: 4,
        step: 8,
      },
      { // [GT]
        lid: "Peano-c",
        axiom: "+Z",
        rules: {
          X: "FX-FY-FX+FY+FX+FY+FX+FY+FX-FY-FX-FY-FX-FY-FX+FY+FX",
          Y: "FY",
          Z: "FX",
        },
        alpha: 0,
        theta: 45,
        iterations: 5,
        step: 3.5,
      },
      { // [WM]
        lid: "pentive",
        axiom: "Q",
        rules: {
          P: "--FR++++FS--FU",
          Q: "FT++FR----FS++",
          R: "++FP----FQ++FT",
          S: "FU--FP++++FQ--",
          T: "+FU--FP+",
          U: "-FQ++FT-",
        },
        alpha: 36,
        theta: 36,
        iterations: 7,
        step: 15,
      },
      { // [AM]
        lid: "quartet",
        axiom: "FG",
        rules: {
          A: "FGFA+HFA+FG-FA",
          G: "FG+FA-FG-JFGFA",
          H: "-",
          J: "+",
        },
        alpha: 0,
        theta: 90,
        step: 7,
        iterations: 5,
      },
      {
        lid: "Sierpinski arrowhead",
        axiom: "A",
        rules: {
          A: "FC-FA-FC",
          C: "FA+FC+FA",
        },
        alpha: 180,
        theta: 60,
        iterations: 8,
        step: 3,
      },
      {
        lid: "Sierpinski curve",
        axiom: "F+XF+F+XF",
        rules: {
          F: "F",
          X: "XF-F+F-XF+F+XF-F+F-X",
        },
        alpha: 45,
        theta: 90,
        iterations: 4,
        step: 8,
      },
      { // [WM]
        lid: "Sierpinski median curve",
        axiom: "L--F--L--F",
        rules: {
          F: "F",
          L: "+R-F-R+",
          R: "-L+F+L-",
        },
        alpha: 0,
        theta: 45,
        iterations: 10,
        step: 5,
      },
      { // [GT]
        lid: "tri-9-a",
        axiom: "X",
        rules: {
          X: "FFFFWWPP+FP+FW+FP+FX-FP-FX-FP-FY+FP+FX-FP-FX-FP-FY+FP+FX-FP-FY+FP+FX",
          Y: "FFFFWWPP-FP-FW-FP-FY+FP+FY+FP+FX-FP-FY+FP+FY+FP+FX-FP-FY+FP+FX-FP-FY",
          P: "FP",
          W: "FFFFFFFPPPPWWW",
        },
        alpha: 180,
        theta: 60,
        step: 8,
        iterations: 3,
      },
    ],
  },

  {
    cid: "Dragons",
    items: [
      {
        lid: "dragon",
        axiom: "FX",
        rules: {
          F: "F",
          X: "X+YF",
          Y: "FX-Y",
        },
        alpha: 0,
        theta: 90,
        iterations: 12,
        step: 5,
      },
      {
        lid: "median dragon",
        axiom: "-X",
        rules: {
          F: "F",
          X: "X+F+Y",
          Y: "X-F-Y",
        },
        alpha: 0,
        theta: 45,
        iterations: 12,
        step: 3,
      },
      { // [WM]
        lid: "terdragon",
        axiom: "F",
        rules: {
          F: "F+F-F",
        },
        alpha: 120,
        theta: 120,
        iterations: 8,
        step: 6,
      },
      {
        lid: "terdragon tiling",
        axiom: "X",
        rules: {
          X: "F-F-F+F+FX++F-F-F+F+FX--F-F-F+F+FX",
        },
        alpha: 30,
        theta: 60,
        step: 5,
        iterations: 7,
      },
      { // [SF] (Maze01)
        lid: "tridragon",
        axiom: "F+F+F",
        rules: {
          F: "F+FF-F",
        },
        alpha: 0,
        theta: 120,
        step: 6,
        iterations: 6,
      },
      { // [WM]
        lid: "twindragon boundary",
        axiom: "OTUZ",
        alpha: 0,
        theta: 90,
        step: 5,
        iterations: 12,
        rules: {
          O: "FO+F-T",
          P: "++F--U+F-X",
          Q: "-F+V++F--Q",
          R: "-F+ZFS",
          S: "FW",
          T: "++F--U",
          U: "++F--Y",
          V: "FS",
          W: "FO+F-P",
          X: "++F--Y+F-X",
          Y: "-F+R++F--Q",
          Z: "-F+ZFW",
        },
      },
    ],
  },

  {
    cid: "Miscellaneous",
    items: [
      { // [AH]
        lid: "Cesaro 1",
        axiom: "F",
        rules: {
          F: "F++++++++++F--------------------F++++++++++F",
        },
        alpha: 180,
        theta: 8,
        iterations: 6,
        step: 2.9,
      },
      { // [AH*]
        lid: "Cesaro 2",
        axiom: "AAAA",
        rules: {
          A: "F+++++++++F|",
          F: "F++++++++F----------------F++++++++F",
        },
        alpha: 0,
        theta: 10,
        iterations: 6,
        step: 4,
      },
      {
        lid: "rack-wheel",
        axiom: "A+A",
        rules: {
          A: "F++++++F",
          F: "A----------------A",
        },
        alpha: 0,
        theta: 10,
        iterations: 9,
        step: 60,
        attributes: {
          stroke: "white",
          fill: "steelblue",
        },
      },
      { // [AK]
        lid: "sea urchin",
        axiom: "F",
        rules: {
          F: "F[-F+F-F]+[+F-F-F]",
        },
        alpha: 0,
        theta: 20,
        iterations: 5,
        step: 15,
        attributes: {
          stroke: ["#800", "#800", "#800", "#971a8b", "#804", "rgba(229,169,169,0.12)"],
          transform: ["n/a", "n/a", "n/a", "n/a", "n/a", "scale(0.85)"],
        },
      },
    ],
  },

  {
    cid: "Plants",
    items: [
      { // [PB]
        lid: "algae",
        axiom: "AF",
        rules: {
          A: "FFFFFV[+++H][---Q]BW",
          B: "B",
          C: "FFFFFV[+++BA]BD",
          D: "FFFFFV[+++H][---Q]BE",
          E: "FFFFFV[+++H][---Q]BG",
          F: "F",
          G: "FFFFFV[---BA]BA",
          H: "IBFF",
          I: "BFFF[--M]J",
          J: "BFFF[--N]K",
          K: "BFFF[--O]L",
          L: "BFFF[--P]",
          M: "BFN",
          N: "BFO",
          O: "BFP",
          P: "BF",
          Q: "RBF",
          R: "BFFF[++M]S",
          S: "BFFF[++N]T",
          T: "BFFF[++O]U",
          U: "BFFF[++P]",
          V: "FV",
          W: "FFFFFV[+++H][---Q]BC",
        },
        alpha: 90,
        theta: 12,
        iterations: 17,
        step: 2,
        attributes: {
          stroke: "seagreen",
        },
      },
      { // [PB]
        lid: "algae 2",
        axiom: "AF",
        rules: {
          A: "FFFFFY[++++N][----T]BZ",
          B: "B",
          C: "FFFFFY[++++N][----T]BD",
          D: "FFFFFY[++++N][----T]BE",
          E: "FFFFFY[++++N][----T]BG",
          F: "F",
          G: "FFFFFY[+++BA]BH",
          H: "FFFFFY[++++N][----T]BI",
          I: "+FFFFFY[++++N][----T]BJ",
          J: "FFFFFY[++++N][----T]BK",
          K: "-FFFFFY[++++N][----T]BL",
          L: "FFFFFY[++++N][----T]BM",
          M: "FFFFFY[---BA]BA",
          N: "OBFFF",
          O: "BFFFP",
          P: "BFFF[-S]Q",
          Q: "BFFF[-S]R",
          R: "BFFF[-S]",
          S: "BFBF",
          T: "UBFFF",
          U: "BFFFV",
          V: "BFFF[+S]W",
          W: "BFFF[+S]X",
          X: "BFFF[+S]",
          Y: "FY",
          Z: "+FFFFFY[++++N][----T]BC",
        },
        alpha: 90,
        theta: 12,
        iterations: 17,
        step: 2,
        attributes: {
          stroke: "seagreen",
        },
      },
      {
        lid: "bonsai branch",
        axiom: "A",
        rules: {
          F: "F",
          A: "F-FFA+[FAFA+FFF]F",
        },
        alpha: 90,
        theta: 30,
        iterations: 5,
        step: 7,
        attributes: {
          stroke: ["olive", "darkolivegreen", "forestgreen"],
          "stroke-width": ["5", "3", "2", "1"],
          "stroke-linecap": "round",
        },
      },
      {
        lid: "bush 1",
        axiom: "F",
        rules: {
          F: "F[+FF][-FF]F[-F][+F]F",
        },
        alpha: 90,
        theta: 35,
        iterations: 4,
        step: 6,
        attributes: {
          stroke: ["#480", "#480", "#9a0", "#9a0", "#ea0"],
        },
      },
      {
        lid: "bush 2",
        axiom: "F",
        rules: {
          F: "FF+[+F-F-F]-[-F+F+F]",
        },
        alpha: 90,
        theta: 22.5,
        iterations: 4,
        step: 9,
        attributes: {
          stroke: ["#380", "#480", "#690", "#690", "#cb0"],
          "stroke-width": ["4", "3", "2", "1"],
        },
      },
      { // [PB]
        lid: "bush 3",
        axiom: "VZFFF",
        rules: {
          F: "F",
          V: "[+++W][---W]YV",
          W: "+X[-W]Z",
          X: "-W[+X]Z",
          Y: "YZ",
          Z: "[-FFF][+FFF]F",
        },
        alpha: 90,
        theta: 20,
        iterations: 9,
        step: 12,
        attributes: {
          stroke: ["darkolivegreen", "forestgreen"],
          "stroke-width": ["3", "2", "1"],
        },
      },
      {
        lid: "dandelion",
        axiom: "FFFFFF[-Y][Z][+Z]",
        rules: {
          F: "F",
          Y: "FF+F-F-F[FFFZ][+Z]-F-FZ",
          Z: "FF-F+F+F[Y][-Y]+F+FY",
        },
        alpha: 90,
        theta: 15,
        iterations: 7,
        step: 5,
        attributes: {
          stroke: ["#690", "#7a0", "#9a0", "#aa0", "#aa0", "#cb0", "#dd0", "#ed0"],
          "stroke-width": ["5", "2", "2", "1"],
          "stroke-linecap": "square",
        },
      },
      {
        lid: "flower 1",
        axiom: "F[+F+F][-F-F][++F][--F]F",
        rules: {
          F: "FF[++F][+F][F][-F][--F]",
        },
        alpha: 90,
        theta: 11.25,
        iterations: 3,
        step: 15,
        attributes: {
          stroke: ["#080", "#080", "#080", "#9a0", "#e80"],
          "stroke-width": ["3", "1"],
        },
      },
      {
        lid: "flower 2",
        axiom: "F-F+F[++X][F+X][F-X][--X]",
        rules: {
          F: "F",
          W: "F-F+F[++X][F+X][F-X][--X]",
          X: "F+FF-F[++Y][+Y][-Z][--Z]",
          Y: "-[Z]F-FF-FF-FF-F[Z]",
          Z: "+[Y]F+FF+FF+FF+F[Y]",
        },
        alpha: 90,
        theta: 10,
        iterations: 9,
        step: 4.5,
        attributes: {
          stroke: "#d50", // "url(#gradient)",
          "stroke-width": "1.5",
        },
      },
      {
        lid: "grass",
        axiom: "[X][Y]++[X][Y]++[X][Y]++[X][Y]++[X][Y]",
        rules: {
          W: "YF++ZF----XF[-YF----WF]++",
          X: "+YF--ZF[---WF--XF]+",
          Y: "-WF++XF[+++YF++ZF]-",
          Z: "--YF++++WF[+ZF++++XF]--XF",
        },
        alpha: 110,
        theta: 5,
        step: 10,
        iterations: 4,
        attributes: {
          stroke: ["olivedrab", "forestgreen"],
          "stroke-width": ["3", "2", "1"],
        },
      },
      { // [AK]
        lid: "liana sarment",
        axiom: "FYX",
        rules: {
          F: "FFFXYFXY-[FFFXYFXY]",
          X: "Y[[XY]+X]+F[+FX]+XF",
          Y: "[FFF[[YX]+Y]+F[+FY]+F]",
        },
        alpha: 90,
        theta: 20,
        iterations: 4,
        step: 0.8,
        attributes: {
          stroke: "forestgreen",
          "stroke-width": ["4", "3", "2", "1"],
        },
      },
      { // [AK]
        lid: "liana tangle",
        axiom: "FYX",
        rules: {
          F: "FFFXYFXY-[FFFXYFXY]",
          X: "Y[[XY]+X]+F[+FX]+XF",
          Y: "FFF[[YX]+Y]+F[+FY]+F",
        },
        alpha: 90,
        theta: 20,
        iterations: 4,
        step: 2,
        attributes: {
          stroke: "forestgreen",
          "stroke-width": ["3", "2", "1"],
        },
      },
      {
        lid: "plant 1",
        axiom: "X",
        rules: {
          F: "FF",
          X: "F-[[X]+X]+F[+FX]-X",
        },
        alpha: 90,
        theta: 25,
        iterations: 6,
        step: 4,
        attributes: {
          stroke: ["#080", "#080", "#080", "#080", "#080", "#080", "#8a0"],
        },
      },
      {
        lid: "plant 2",
        axiom: "F",
        rules: {
          F: "F[+F]F[-F][F]",
        },
        alpha: 90,
        theta: 20,
        iterations: 5,
        step: 10,
        attributes: {
          stroke: ["#260", "#160", "#080", "#080", "#8a0", "#850"],
          "stroke-width": ["4", "2", "2", "1"],
        },
      },
      {
        lid: "plant 3",
        axiom: "X",
        rules: {
          F: "FF",
          X: "F[+X][-X]FX",
        },
        alpha: 90,
        theta: 25.71,
        iterations: 7,
        step: 2.5,
        attributes: {
          stroke: "#160",
          "stroke-width": ["2", "1"],
        },
      },
      {
        lid: "plant 4",
        axiom: "--------C",
        rules: {
          F: "F",
          C: "NF[--P]F+C",
          N: "NFF",
          P: "Q",
          Q: "C",
        },
        alpha: 0,
        theta: 11.25,
        iterations: 20,
        step: 1.2,
        attributes: {
          stroke: ["#260", "#160", "#080", "#080", "#6a0"],
          "stroke-width": ["3", "2", "2", "1"],
        },
      },
      { // [KP]
        lid: "plant 5",
        axiom: "----G",
        rules: {
          F: "F",
          G: "GFX[+G][-G]",
          X: "X[-FFF][+FFF]FX",
        },
        alpha: 0,
        theta: 25.7,
        iterations: 6,
        step: 4,
        attributes: {
          stroke: ["#260", "#160", "#080", "#080", "#8a0", "#aa0"],
        },
      },
      {
        lid: "plant 6",
        axiom: "X",
        rules: {
          F: "FF",
          X: "F-[[X]+Y]+F[+Y]-Y",
          Y: "F+[[Y]-X]-F[-X]+X",
        },
        alpha: 90,
        theta: 30,
        iterations: 7,
        step: 3,
        attributes: {
          stroke: ["#260", "#160", "#080", "#080", "#080", "#080", "#8a0"],
          "stroke-width": ["1.5", "1"],
        },
      },
      {
        lid: "sapling",
        axiom: "FFFFFFX",
        rules: {
          F: "F",
          X: "FFF-[-F+F[Y]-[X]]+[+F+F[X]-[X]]",
          Y: "FF-[-F+F]+[+F+FY]",
        },
        alpha: 90,
        theta: 15,
        iterations: 6,
        step: 10,
        attributes: {
          stroke: "#6f4d35",
          "stroke-width": ["16", "11", "9", "7", "6", "5", "3", "2", "2", "1"],
          "stroke-linecap": ["square", "round"],
        },
      },
      { // [AK]
        lid: "savine 1",
        axiom: "F-F[-F+F-F]+[+F-F-F]",
        rules: {
          F: "-F[-F+F-F]+[+F-F-F]-F[-F+F-F]+[+F-F-F]-F[-F+F-F]+[+F-F-F]",
        },
        alpha: 0,
        theta: 20,
        iterations: 3,
        step: 3.5,
        attributes: {
          stroke: ["#500", "#500", "#740", "#206000", "#387300"],
        },
      },
      { // [AK]
        lid: "savine 2",
        axiom: "-[F-F[-F+F-F]+[+F-F-F]]+[F-F[-F+F-F]+[+F-F-F]]",
        rules: {
          F: "-F[-F+F-F]+[+F-F-F]-F[-F+F-F]+[+F-F-F]-F[-F+F-F]+[+F-F-F]",
        },
        alpha: 0,
        theta: 20,
        iterations: 3,
        step: 4,
        attributes: {
          stroke: ["#300", "#600", "#740", "#206000", "#327100"],
          style: ["opacity: 1;", "opacity: 0.9;", "filter: drop-shadow(0 0 0 #030); opacity: 0.85;", "filter: drop-shadow(0 0 0 #030); opacity: 0.8;"],
        },
      },
      {
        lid: "sticks",
        axiom: "X",
        rules: {
          F: "FF",
          X: "F[+X]F[-X]+X",
        },
        alpha: 90,
        theta: 20,
        iterations: 7,
        step: 2,
        attributes: {
          stroke: ["#260", "#160", "#080", "#080", "#8a0"],
          "stroke-width": ["1.5", "1"],
        },
      },
      {
        lid: "tree",
        axiom: "F",
        rules: {
          F: "-F[-F+F-F]+[+F-F-F]",
        },
        alpha: 0,
        theta: 20,
        iterations: 5,
        step: 15,
        attributes: {
          stroke: ["#420", "#420", "#420", "#123202", "rgba(71,102,0,0.8)", "rgba(73,136,0,0.7)"],
          "stroke-width": ["7", "6", "5", "3", "2", "1"],
        },
      },
      {
        lid: "tree 2",
        axiom: "FFF+FFFF-FF+FF-[-Y][+Y][Z][+!Z!]",
        rules: {
          F: "F",
          Y: "FF+F-F-F[FFFZ][+Z]-F-FZ",
          Z: "FF-F+F+F[FY][-Y]+F+F++Y",
        },
        alpha: 90,
        theta: 10,
        iterations: 7,
        step: 6,
        attributes: {
          stroke: ["#6f4d35", "#6f4d35", "#5f4d35", "#55771c", "#55771c", "#44621c", "rgba(131, 163, 90, 0.5)", "rgba(164, 184, 102, 0.5)", "rgba(192, 200, 97, 0.5)"],
          "stroke-width": ["13", "6", "3", "1"],
          "stroke-linecap": ["square", "square", "round"],
          transform: ["skewY(-35)", "n/a"],
        },
      },
      {
        lid: "weed",
        axiom: "F",
        rules: {
          F: "F[+F]F[-F]F",
        },
        alpha: 90,
        theta: 25.714,
        iterations: 5,
        step: 2,
        attributes: {
          stroke: ["#080", "#080", "#080", "#9a0"],
          "stroke-width": ["1.5", "1"],
        },
      },
    ],
  },

  {
    cid: "Shapes",
    items: [
      {
        lid: "carpet",
        axiom: "F-F-F-F",
        rules: {
          F: "F[F]-F+F[--F]+F-F",
        },
        alpha: 0,
        theta: 90,
        step: 3,
        iterations: 5,
        attributes: {
          stroke: ["gold", "brown"],
        },
      },
      {
        lid: "crystal",
        axiom: "F+F+F+F",
        rules: {
          F: "FF+F++F+F",
        },
        alpha: 0,
        theta: 90,
        iterations: 4,
        step: 5,
        attributes: {
          stroke: "mediumaquamarine",
          "stroke-width": "2",
        },
      },
      { // [SF]
        lid: "Dekking’s church",
        axiom: "WXYZ",
        rules: {
          W: "FW+F-ZFW-F+X",
          X: "FW+F-Z",
          Y: "++F--Y+F-Z",
          Z: "++F--Y-F+X++F--Y-F+X",
        },
        alpha: 180,
        theta: 90,
        step: 8,
        iterations: 7,
        attributes: {
          "stroke": "mediumslateblue",
          "stroke-width": "1.5",
        },
      },
      { // [SF]
        lid: "doily",
        axiom: "F--F--F--F--F--F",
        rules: {
          F: "-F[--F--F]++F[++F--F]--F+",
        },
        alpha: 0,
        theta: 30,
        step: 5,
        iterations: 4,
        attributes: {
          stroke: ["cornflowerblue", "cornflowerblue", "gold", "cornflowerblue"],
          "stroke-width": "1.5",
        },
      },
      {
        lid: "double Penrose",
        axiom: "[X][Y]++[X][Y]++[X][Y]++[X][Y]++[X][Y]",
        alpha: 0,
        rules: {
          W: "YF++ZF----XF[-YF----WF]++",
          X: "+YF--ZF[---WF--XF]+",
          Y: "-WF++XF[+++YF++ZF]-",
          Z: "--YF++++WF[+ZF++++XF]--XF",
        },
        theta: 36,
        step: 25,
        iterations: 5,
        attributes: {
          stroke: "forestgreen",
          "stroke-width": "2",
          "stroke-linejoin": "round",
        },
      },
      {
        lid: "fluffy globule",
        axiom: "X-X-X-X-X-X-X-X-X",
        rules: {
          X: "FX+X--X+X--X+X--X+X",
        },
        alpha: 0,
        theta: 40,
        iterations: 4,
        step: 18,
      },
      { // [MR*]
        lid: "hexagonal star",
        axiom: "L",
        rules: {
          L: "L-FR--FR-F++LF++L-F+LF+R-",
          R: "+L-FR-F+R--FR--F+LF++LF+R",
        },
        alpha: -60,
        theta: 60,
        iterations: 5,
        step: 4.75,
      },
      { // [SF]
        lid: "hex",
        axiom: "F",
        rules: {
          F: "-F+F+G[+F+F]-",
          G: "GG",
        },
        alpha: -30,
        theta: 60,
        step: 10,
        iterations: 7,
        attributes: {
          stroke: "dodgerblue",
          "stroke-width": "1.5",
        },
      },
      { // [MR]
        lid: "HexGasket",
        axiom: "F+F+F+F+F+F--",
        rules: {
          F: "F+F+F--F--F+F+F",
        },
        alpha: 0,
        theta: 60,
        iterations: 4,
        step: 3,
      },
      { // [AH]
        lid: "horizons",
        axiom: "+F|F",
        rules: {
          F: "F+F+F|F+F+F",
        },
        alpha: 0,
        theta: 45,
        iterations: 5,
        step: 1.5,
      },
      {
        lid: "Levi’s carpet",
        axiom: "F++F++F++F",
        rules: {
          F: "+F--F+",
        },
        alpha: 0,
        theta: 45,
        iterations: 14,
        step: 2,
      },
      {
        lid: "Levi’s fractal",
        axiom: "F",
        rules: {
          F: "+F--F+",
        },
        alpha: 180,
        theta: 45,
        iterations: 14,
        step: 2,
      },
      {
        lid: "mosaic",
        axiom: "F-F-F-F",
        rules: {
          F: "F-B+FF-F-FF-FB-FF+B-FF+F+FF+FB+FFF",
          B: "BBBBBB",
        },
        alpha: 0,
        theta: 90,
        iterations: 2,
        step: 7,
      },
      { // [AM]
        lid: "napkin",
        axiom: "F--F--F--F--F--F",
        rules: {
          F: "-F[--F--F]++F--F+",
        },
        alpha: 0,
        theta: 30,
        iterations: 4,
        step: 5,
        attributes: {
          stroke: ["cornflowerblue", "mediumorchid"],
          "stroke-width": ["2", "1"],
        },
      },
      { // [HS*]
        lid: "Penrose mosaic",
        axiom: "+W--X---Y--Z",
        rules: {
          W: "YF++ZF----XF[-YF----WF]++",
          X: "+YF--ZF[---WF--XF]+",
          Y: "-WF++XF[+++YF++ZF]-",
          Z: "--YF++++WF[+ZF++++XF]--XF",
        },
        alpha: 270,
        theta: 36,
        iterations: 6,
        step: 14,
        attributes: {
          stroke: "forestgreen",
          "stroke-width": "1.5",
          "stroke-linejoin": "round",
        },
      },
      { // [HS]
        lid: "Penrose tesselation",
        axiom: "[X]++[X]++[X]++[X]++[X]",
        rules: {
          W: "YF++ZF----XF[-YF----WF]++",
          X: "+YF--ZF[---WF--XF]+",
          Y: "-WF++XF[+++YF++ZF]-",
          Z: "--YF++++WF[+ZF++++XF]--XF",
        },
        alpha: 0,
        theta: 36,
        iterations: 5,
        step: 20,
        attributes: {
          stroke: "forestgreen",
          "stroke-width": "1.5",
          "stroke-linejoin": "round",
        },
      },
      { // [WM]
        lid: "pentant",
        axiom: "X-X-X-X-X",
        rules: {
          X: "FX-FX-FX+FY+FY+FX-FX",
          Y: "FY+FY-FX-FX-FY+FY+FY",
        },
        alpha: 0,
        theta: 72,
        step: 3,
        iterations: 4,
      },
      { // [WM]
        lid: "pentigree",
        axiom: "F-F-F-F-F",
        rules: {
          F: "F-F++F+F-F-F",
        },
        alpha: 0,
        theta: 72,
        iterations: 4,
        step: 5,
      },
      {
        lid: "plate",
        axiom: "S",
        rules: {
          F: "F",
          S: "[[L]D[L]DD[L]D]-S",
          D: "FF++++++++++++++++++",
          L: "+++++++++F",
        },
        alpha: 0,
        theta: 5,
        step: 100,
        iterations: 73,
        attributes: {
          stroke: ["slateblue", "crimson"],
          "stroke-width": ["1.5", "2"],
          "stroke-dasharray": ["n/a", "10 3"],
        },
      },
      {
        lid: "Sierpinski carpet",
        axiom: "FXF--FF--FF",
        rules: {
          F: "FF",
          X: "--FXF++FXF++FXF--",
          Y: "-FX-Y",
        },
        alpha: 0,
        theta: 60,
        iterations: 5,
        step: 7,
      },
      {
        lid: "snowflake",
        axiom: "[F]+[F]+[F]+[F]+[F]+[F]",
        rules: {
          F: "F[++F][-FF]FF[+F][-F]FF",
        },
        alpha: 0,
        theta: 60,
        iterations: 3,
        step: 2,
        attributes: {
          stroke: "deepskyblue",
        },
      },
      { // [SE*]
        lid: "snowflake 2",
        axiom: "[X]++[X]++[X]++[X]",
        rules: {
          X: "[+Y][-Y][++Y][--Y]",
          Y: "YF[X]YF",
        },
        alpha: 0,
        theta: 45,
        iterations: 9,
        step: 1,
        attributes: {
          stroke: "deepskyblue",
        },
      },
      { // [HS]
        lid: "sphinx",
        axiom: "X",
        rules: {
          F: "BB",
          B: "BB",
          X: "+FF-YFF+FF--FFF|X|F--YFFFYFFF|",
          Y: "-FF+XFF-FF++FFF|Y|F++XFFFXFFF|",
        },
        alpha: 180,
        theta: 60,
        step: 10,
        iterations: 5,
        attributes: {
          stroke: "sandybrown",
          "stroke-linejoin": "round",
          "stroke-width": "2.5",
        },
      },
      { // [PP]
        lid: "spiral tiling",
        axiom: "AAAA",
        rules: {
          F: "F",
          A: "X+X+X+X+X+X+",
          X: "[F+F+F+F[---X-Y]+++++F++++++++F-F-F-F]",
          Y: "[F+F+F+F[---Y]+++++F++++++++F-F-F-F]",
        },
        alpha: 0,
        theta: 15,
        iterations: 5,
        step: 10,
      },
      {
        lid: "square",
        axiom: "F+F+F+F",
        rules: {
          F: "FF+F+F+F+FF",
        },
        alpha: 0,
        theta: 90,
        iterations: 4,
        step: 5,
        attributes: {
          stroke: "forestgreen",
          "stroke-width": "1.5",
        },
      },
      { // [SE*]
        lid: "wheel",
        axiom: "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
        rules: {
          W: "[X]+",
          X: "[+++++++++++++Y[X]]-------------Y[X]",
          Y: "YFYF",
        },
        alpha: 0,
        theta: 5,
        iterations: 8,
        step: 2,
      },
      {
        lid: "wire globule",
        axiom: "F",
        rules: {
          F: "FF-F-FF+",
        },
        alpha: 0,
        theta: 35,
        step: 25,
        iterations: 5,
      },
      { // [WM]
        lid: "Xmas tree",
        axiom: "W",
        rules: {
          W: "++FX--FW--FY++",
          X: "-FZ++FY-",
          Y: "--FZ++FY++FW--",
          Z: "+FX--FW+",
        },
        alpha: 180,
        theta: 36,
        step: 8,
        iterations: 8,
        attributes: {
          stroke: "darkgreen",
          "stroke-width": "6",
          "stroke-dasharray": "5 2",
          fill: "limegreen",
        },
      },
    ],
  },
];

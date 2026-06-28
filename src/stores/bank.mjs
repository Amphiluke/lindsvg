/**
 * L-system author/source index:
 *
 *  - [AH] — Anthony Hanmer
 *  - [AK] — A.V. Kalmykov
 *  - [AM] — Adrian Mariano
 *  - [HS] — Herb Savage
 *  - [GT] — Gary Teachout
 *  - [KP] — Ken Philip
 *  - [MR] — Michael A. Rouse
 *  - [PB] — Paul Bourke
 *  - [PP] — from P. Prusinkiewicz & J. Hanan, 1989
 *  - [SE] — SirEdvin
 *  - [SF] — Spanky Fractal Database (https://web.archive.org/web/20160903112517/http://www.nahee.com/spanky/pub/fractals/lsystems/)
 *  - [VB] — Vexlio blog post (https://vexlio.com/blog/drawing-simple-organics-with-l-systems/)
 *  - [WM] — William McWorter
 * 
 * An asterisk (*) near the reference means that the original L-system parameters
 * were modified for optimisation purposes
 * 
 * I apologize to the authors of L-systems going without any attribution.
 * Any help with affiliation of those L-systems is appreciated.
 */

/** @import {LSLetter, LSParams, LSVGPathAttributes} from "lindsvg" */

/**
 * L-system configuration
 * @typedef {object} LSystem
 * @property {string} lid - Unique identifier and the name of the L-system
 * @property {LSParams[]} params - L-system parameters
 * @property {LSVGPathAttributes[]} [attributes] - SVG attributes
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
        params: Array.from({length: 2}, () => ({
          axiom: "-X--X",
          rules: {
            F: "F",
            X: "XFX--XFX",
          },
          theta: 45,
          step: 10,
          iterations: 5,
        })),
        attributes: Array.from({length: 2}, (_el, index) => ({
          stroke: index ? "antiquewhite" : "indianred",
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": index ? "1" : "7",
        })),
      },
      { // [WM]
        lid: "border",
        params: [{
          axiom: "XYXYXYX+XYXYXYX+XYXYXYX+XYXYXYX",
          rules: {
            X: "FX+FX+FXFY-FY-",
            Y: "+FX+FXFY-FY-FY",
          },
          theta: 90,
          step: 5,
          iterations: 3,
        }],
        attributes: [{
          stroke: "sienna",
          "stroke-width": "1.5",
        }],
      },
      { // [AH]
        lid: "Cesaro 1",
        params: [{
          axiom: "F",
          rules: {
            F: "F++++++++++F--------------------F++++++++++F",
          },
          alpha: 180,
          theta: 8,
          step: 2.9,
          iterations: 6,
        }],
      },
      { // [AH*]
        lid: "Cesaro 2",
        params: [{
          axiom: "AAAA",
          rules: {
            A: "F+++++++++F|",
            F: "F++++++++F|++F++++++++F",
          },
          theta: 10,
          step: 4,
          iterations: 6,
        }],
      },
      {
        lid: "chain",
        params: [{
          axiom: "F+F+F+F",
          rules: {
            F: "F+B-F-FFF+F+B-F",
            B: "BBB",
          },
          theta: 90,
          step: 4,
          iterations: 3,
        }],
        attributes: [{
          stroke: "darkgoldenrod",
          "stroke-width": "1.5",
        }],
      },
      { // [WM]
        lid: "cross",
        params: [{
          axiom: "X",
          rules: {
            X: "FX+FX+FXFY-FY-",
            Y: "+FX+FXFY-FY-FY",
          },
          theta: 90,
          step: 4.5,
          iterations: 5,
        }],
      },
      { // [AM]
        lid: "fass 1",
        params: [{
          axiom: "-L",
          rules: {
            F: "F",
            L: "LF+RFR+FL-F-LFLFL-FRFR+",
            R: "-LFLF+RFRFR+F+RF-LFL-FR",
          },
          theta: 90,
          step: 6,
          iterations: 4,
        }],
      },
      { // [AM]
        lid: "fass 2",
        params: [{
          axiom: "-L",
          rules: {
            F: "F",
            L: "LFLF+RFR+FLFL-FRF-LFL-FR+F+RF-LFL-FRFRFR+",
            R: "-LFLFLF+RFR+FL-F-LF+RFR+FLF+RFRF-LFL-FRFR",
          },
          theta: 90,
          step: 7,
          iterations: 3,
        }],
      },
      { // [WM]
        lid: "frame",
        params: [{
          axiom: "YXY-YXY-YXY-YXY",
          rules: {
            X: "FX+FX+FXFYFX+FXFY-FY-FY-",
            Y: "+FX+FX+FXFY-FYFXFY-FY-FY",
          },
          theta: 90,
          step: 4,
          iterations: 3,
        }],
      },
      {
        lid: "Gosper curve",
        params: [{
          axiom: "XF",
          rules: {
            F: "F",
            X: "X+YF++YF-FX--FXFX-YF+",
            Y: "-FX+YFYF++YF+FX--FX-Y",
          },
          theta: 60,
          step: 8,
          iterations: 4,
        }],
      },
      { // [GT*]
        lid: "hex-7-b",
        params: [{
          axiom: "X",
          rules: {
            X: "-F++F-X-F--F+Y---F--F+Y+F++F-X+++F++F-X-F++F-X+++F--F+Y--",
            Y: "+F++F-X-F--F+Y+F--F+Y---F--F+Y---F++F-X+++F++F-X+++F--F+Y",
          },
          theta: 30,
          step: 5,
          iterations: 4,
        }],
      },
      {
        lid: "Hilbert curve",
        params: [{
          axiom: "X",
          rules: {
            F: "F",
            X: "-YF+XFX+FY-",
            Y: "+XF-YFY-FX+",
          },
          theta: 90,
          step: 7,
          iterations: 6,
        }],
      },
      {
        lid: "Koch’s curve",
        params: [{
          axiom: "F+F+F+F",
          rules: {
            F: "FF+F+F+F+F+F-F",
          },
          theta: 90,
          step: 3.5,
          iterations: 4,
        }],
      },
      {
        lid: "Koch’s snowflake",
        params: [{
          axiom: "F++F++F",
          rules: {
            F: "F-F++F-F",
          },
          theta: 60,
          step: 5,
          iterations: 4,
        }],
        attributes: [{
          stroke: "deepskyblue",
          "stroke-width": "1.5",
        }],
      },
      { // [WM]
        lid: "lace",
        params: [{
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
          step: 4.5,
          iterations: 7,
        }],
      },
      { // [PP]
        lid: "mango-tree foliage",
        params: [{
          axiom: "A---A",
          rules: {
            F: "F",
            B: "B",
            A: "B-F+Z+F-BA",
            Z: "F-FF-F--[--Z]F-FF-F--F-FF-F--",
          },
          theta: 60,
          step: 15,
          iterations: 7,
        }],
      },
      {
        lid: "meander",
        params: [
          {
            axiom: "A",
            rules: {
              A: "CCDEEGA",
              C: "FF+++++++++++++++",
              D: "F+++++++++++++++",
              E: "F---------------",
              F: "F",
              G: "FF--------------",
            },
            theta: 6,
            step: 10,
            iterations: 61,
          },
          {
            axiom: "A",
            rules: {
              A: "F+A",
              F: "F",
            },
            x: -308,
            y: -300,
            theta: 8,
            step: 44,
            iterations: 45,
          },
          {
            axiom: "A",
            rules: {
              A: "F+A",
              F: "F",
            },
            x: -305.5,
            y: -262.8,
            theta: 8,
            step: 38.8,
            iterations: 45,
          },
        ],
        attributes: [
          {
            stroke: "sienna",
            "stroke-width": "4",
            "stroke-linecap": "square",
          },
          {
            stroke: "sienna",
            "stroke-width": "4",
          },
          {
            stroke: "sienna",
            "stroke-width": "4",
          },
        ],
      },
      {
        lid: "Moore curve",
        params: [{
          axiom: "LFL+F+LFL",
          rules: {
            F: "F",
            L: "-RF+LFL+FR-",
            R: "+LF-RFR-FL+",
          },
          alpha: 90,
          theta: 90,
          step: 7,
          iterations: 5,
        }],
      },
      { // [WM]
        lid: "Moore’s curl",
        params: [{
          axiom: "X",
          rules: {
            X: "FX+FX+FXFYFX+FXFY-FY-FY-",
            Y: "+FX+FX+FXFY-FYFXFY-FY-FY",
          },
          alpha: 180,
          theta: 90,
          step: 3.5,
          iterations: 4,
        }],
      },
      { // [AM]
        lid: "Peano curve",
        params: [{
          axiom: "F",
          rules: {
            F: "F-F+F+F+F-F-F-F+F",
          },
          alpha: 45,
          theta: 90,
          step: 8,
          iterations: 4,
        }],
      },
      { // [GT]
        lid: "Peano-c",
        params: [{
          axiom: "+Z",
          rules: {
            X: "FX-FY-FX+FY+FX+FY+FX+FY+FX-FY-FX-FY-FX-FY-FX+FY+FX",
            Y: "FY",
            Z: "FX",
          },
          theta: 45,
          step: 3.5,
          iterations: 5,
        }],
      },
      { // [WM]
        lid: "pentive",
        params: [{
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
          step: 25,
          iterations: 7,
        }],
      },
      {
        lid: "pentive rectangle",
        params: Array.from({length: 2}, () => ({
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
          step: 25,
          iterations: 7,
        })),
        attributes: [
          {
            "stroke": "forestgreen",
            "stroke-width": "2",
            "transform": "skewX(-18)",
          },
          {
            "stroke": "forestgreen",
            "stroke-width": "2",
            "transform": "translate(726 -427) scale(-1 -1) skewX(-18)",
          },
        ],
      },
      { // [AM]
        lid: "quartet",
        params: [{
          axiom: "FG",
          rules: {
            A: "FGFA+HFA+FG-FA",
            G: "FG+FA-FG-JFGFA",
            H: "-",
            J: "+",
          },
          theta: 90,
          step: 7,
          iterations: 5,
        }],
      },
      {
        lid: "Sierpinski arrowhead",
        params: [{
          axiom: "A",
          rules: {
            A: "FC-FA-FC",
            C: "FA+FC+FA",
          },
          alpha: 180,
          theta: 60,
          step: 3,
          iterations: 8,
        }],
      },
      {
        lid: "Sierpinski curve",
        params: [{
          axiom: "F+XF+F+XF",
          rules: {
            F: "F",
            X: "XF-F+F-XF+F+XF-F+F-X",
          },
          alpha: 45,
          theta: 90,
          step: 8,
          iterations: 4,
        }],
        attributes: [{
          fill: "orchid",
          "fill-opacity": "0.6",
          stroke: "darkorchid",
          "stroke-width": "5",
          "paint-order": "stroke",
          "stroke-linecap": "square",
        }],
      },
      { // [WM]
        lid: "Sierpinski median curve",
        params: [{
          axiom: "L--F--L--F",
          rules: {
            F: "F",
            L: "+R-F-R+",
            R: "-L+F+L-",
          },
          theta: 45,
          step: 5,
          iterations: 10,
        }],
      },
      { // [GT]
        lid: "tri-9-a",
        params: [{
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
        }],
      },
    ],
  },

  {
    cid: "Dragons",
    items: [
      {
        lid: "dragon",
        params: [{
          axiom: "FX",
          rules: {
            F: "F",
            X: "X+YF",
            Y: "FX-Y",
          },
          theta: 90,
          step: 5,
          iterations: 12,
        }],
      },
      { // [AH]
        lid: "horizons dragon",
        params: [{
          axiom: "+F++++F",
          rules: {
            F: "F+++F-F++++F+F+FF",
          },
          theta: 45,
          step: 3,
          iterations: 5,
        }],
      },
      {
        lid: "median dragon",
        params: [{
          axiom: "-X",
          rules: {
            F: "F",
            X: "X+F+Y",
            Y: "X-F-Y",
          },
          theta: 45,
          step: 3,
          iterations: 12,
        }],
      },
      { // [WM]
        lid: "terdragon",
        params: [{
          axiom: "F",
          rules: {
            F: "F+F-F",
          },
          alpha: 120,
          theta: 120,
          step: 6,
          iterations: 8,
        }],
      },
      {
        lid: "terdragon snowflake",
        params: Array.from({length: 6}, (_el, index) => ({
          axiom: "F",
          rules: {
            F: "F+F-F",
          },
          alpha: index * 60,
          theta: 120,
          step: 6,
          iterations: 8,
        })),
        attributes: Array.from({length: 6}, (_el, index) => ({
          stroke: index % 2 ? "firebrick" : "darkorange",
        })),
      },
      {
        lid: "terdragon tiling",
        params: [{
          axiom: "X",
          rules: {
            X: "F-F-F+F+FX++F-F-F+F+FX--F-F-F+F+FX",
          },
          alpha: 30,
          theta: 60,
          step: 5,
          iterations: 7,
        }],
      },
      { // [SF] (Maze01)
        lid: "tridragon",
        params: [{
          axiom: "F+F+F",
          rules: {
            F: "F+FF-F",
          },
          theta: 120,
          step: 6,
          iterations: 6,
        }],
      },
      {
        lid: "triple terdragon",
        params: Array.from({length: 3}, (_el, index) => ({
          axiom: "F",
          rules: {
            F: "F+F-F",
          },
          y: index ? 0 : 405,
          alpha: index === 1 ? 90 : 30,
          theta: 120,
          step: 5,
          iterations: 8,
        })),
        attributes: ["darkred", "red", "tomato"].map((stroke) => ({stroke})),
      },
      {
        lid: "twindragon",
        params: Array.from({length: 2}, (_el, index) => ({
          axiom: "FX",
          rules: {
            F: "F",
            X: "X+YF+",
            Y: "-FX-Y",
          },
          y: index ? -448 : 0,
          alpha: index ? 180 : 0,
          theta: 90,
          step: 3.5,
          iterations: 14,
        })),
        attributes: ["yellowgreen", "forestgreen"].map((stroke) => ({stroke})),
      },
      { // [WM]
        lid: "twindragon boundary",
        params: [{
          axiom: "OTUZ",
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
          theta: 90,
          step: 5,
          iterations: 12,
        }],
      },
    ],
  },

  {
    cid: "Plants",
    items: [
      { // [PB]
        lid: "algae",
        params: [{
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
          step: 2,
          iterations: 17,
        }],
        attributes: [{
          stroke: "seagreen",
        }],
      },
      { // [PB]
        lid: "algae 2",
        params: [{
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
          step: 2,
          iterations: 17,
        }],
        attributes: [{
          stroke: "seagreen",
        }],
      },
      {
        lid: "bonsai branch",
        params: [{
          axiom: "A",
          rules: {
            F: "F",
            A: "F-FFA+[FAFA+FFF]F",
          },
          alpha: 90,
          theta: 30,
          step: 7,
          iterations: 5,
        }],
        attributes: [{
          stroke: ["olive", "darkolivegreen", "forestgreen"],
          "stroke-width": ["5", "3", "2", "1"],
          "stroke-linecap": "round",
        }],
      },
      {
        lid: "bush 1",
        params: [{
          axiom: "F",
          rules: {
            F: "F[+FF][-FF]F[-F][+F]F",
          },
          alpha: 90,
          theta: 35,
          step: 6,
          iterations: 4,
        }],
        attributes: [{
          stroke: ["#480", "#480", "#9a0", "#9a0", "#ea0"],
        }],
      },
      {
        lid: "bush 2",
        params: [{
          axiom: "F",
          rules: {
            F: "FF+[+F-F-F]-[-F+F+F]",
          },
          alpha: 90,
          theta: 22.5,
          step: 9,
          iterations: 4,
        }],
        attributes: [{
          stroke: ["#380", "#480", "#690", "#690", "#cb0"],
          "stroke-width": ["4", "3", "2", "1"],
        }],
      },
      { // [PB]
        lid: "bush 3",
        params: [{
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
          step: 12,
          iterations: 9,
        }],
        attributes: [{
          stroke: ["darkolivegreen", "forestgreen"],
          "stroke-width": ["3", "2", "1"],
        }],
      },
      {
        lid: "dandelion",
        params: [{
          axiom: "FFFFFF[-Y][Z][+Z]",
          rules: {
            F: "F",
            Y: "FF+F-F-F[FFFZ][+Z]-F-FZ",
            Z: "FF-F+F+F[Y][-Y]+F+FY",
          },
          alpha: 90,
          theta: 15,
          step: 5,
          iterations: 7,
        }],
        attributes: [{
          stroke: ["#690", "#7a0", "#9a0", "#aa0", "#aa0", "#cb0", "#dd0", "#ed0"],
          "stroke-width": ["5", "2", "2", "1"],
          "stroke-linecap": "square",
        }],
      },
      {
        lid: "flower 1",
        params: [{
          axiom: "F[+F+F][-F-F][++F][--F]F",
          rules: {
            F: "FF[++F][+F][F][-F][--F]",
          },
          alpha: 90,
          theta: 11.25,
          step: 15,
          iterations: 3,
        }],
        attributes: [{
          stroke: ["#080", "#080", "#080", "#9a0", "#e80"],
          "stroke-width": ["3", "1"],
        }],
      },
      {
        lid: "flower 2",
        params: [
          {
            axiom: "X",
            rules: {
              F: "FF",
              X: "F[+X][-X]FX",
            },
            y: 300,
            alpha: 90,
            theta: 25.71,
            step: 6,
            iterations: 5,
          },
          {
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
            step: 4.5,
            iterations: 9,
          },
        ],
        attributes: [
          {
            stroke: "#160",
            "stroke-width": ["5", "2"],
          },
          {
            stroke: "#d50",
            "stroke-width": "1.5",
          },
        ],
      },
      {
        lid: "grass",
        params: [{
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
        }],
        attributes: [{
          stroke: ["olivedrab", "forestgreen"],
          "stroke-width": ["3", "2", "1"],
        }],
      },
      { // [AK]
        lid: "liana sarment",
        params: [{
          axiom: "FYX",
          rules: {
            F: "FFFXYFXY-[FFFXYFXY]",
            X: "Y[[XY]+X]+F[+FX]+XF",
            Y: "[FFF[[YX]+Y]+F[+FY]+F]",
          },
          alpha: 90,
          theta: 20,
          step: 0.8,
          iterations: 4,
        }],
        attributes: [{
          stroke: "forestgreen",
          "stroke-width": ["4", "3", "2", "1"],
        }],
      },
      { // [AK]
        lid: "liana tangle",
        params: [{
          axiom: "FYX",
          rules: {
            F: "FFFXYFXY-[FFFXYFXY]",
            X: "Y[[XY]+X]+F[+FX]+XF",
            Y: "FFF[[YX]+Y]+F[+FY]+F",
          },
          alpha: 90,
          theta: 20,
          step: 2,
          iterations: 4,
        }],
        attributes: [{
          stroke: "forestgreen",
          "stroke-width": ["3", "2", "1"],
        }],
      },
      {
        lid: "plant 1",
        params: [{
          axiom: "X",
          rules: {
            F: "FF",
            X: "F-[[X]+X]+F[+FX]-X",
          },
          alpha: 90,
          theta: 25,
          step: 4,
          iterations: 6,
        }],
        attributes: [{
          stroke: ["#080", "#080", "#080", "#080", "#080", "#080", "#8a0"],
        }],
      },
      {
        lid: "plant 2",
        params: [{
          axiom: "F",
          rules: {
            F: "F[+F]F[-F][F]",
          },
          alpha: 90,
          theta: 20,
          step: 10,
          iterations: 5,
        }],
        attributes: [{
          stroke: ["#260", "#160", "#080", "#080", "#8a0", "#850"],
          "stroke-width": ["4", "2", "2", "1"],
        }],
      },
      {
        lid: "plant 3",
        params: [{
          axiom: "X",
          rules: {
            F: "FF",
            X: "F[+X][-X]FX",
          },
          alpha: 90,
          theta: 25.71,
          step: 2.5,
          iterations: 7,
        }],
        attributes: [{
          stroke: "#160",
          "stroke-width": ["2", "1"],
        }],
      },
      {
        lid: "plant 4",
        params: [{
          axiom: "--------C",
          rules: {
            F: "F",
            C: "NF[--P]F+C",
            N: "NFF",
            P: "Q",
            Q: "C",
          },
          theta: 11.25,
          step: 1.2,
          iterations: 20,
        }],
        attributes: [{
          stroke: ["#260", "#160", "#080", "#080", "#6a0"],
          "stroke-width": ["3", "2", "2", "1"],
        }],
      },
      { // [KP]
        lid: "plant 5",
        params: [{
          axiom: "----G",
          rules: {
            F: "F",
            G: "GFX[+G][-G]",
            X: "X[-FFF][+FFF]FX",
          },
          theta: 25.7,
          step: 4,
          iterations: 6,
        }],
        attributes: [{
          stroke: ["#260", "#160", "#080", "#080", "#8a0", "#aa0"],
        }],
      },
      {
        lid: "plant 6",
        params: [{
          axiom: "X",
          rules: {
            F: "FF",
            X: "F-[[X]+Y]+F[+Y]-Y",
            Y: "F+[[Y]-X]-F[-X]+X",
          },
          alpha: 90,
          theta: 30,
          step: 3,
          iterations: 7,
        }],
        attributes: [{
          stroke: ["#260", "#160", "#080", "#080", "#080", "#080", "#8a0"],
          "stroke-width": ["1.5", "1"],
        }],
      },
      {
        lid: "sapling",
        params: [{
          axiom: "F-FFF-F+F+X",
          rules: {
            F: "F",
            X: "FFF-[-F+F[Y]-[X]]+[+F+F[X]-[X]]",
            Y: "FF-[-F+F]+[+F+FY]",
          },
          alpha: 90,
          theta: 15,
          step: 10,
          iterations: 6,
        }],
        attributes: [{
          stroke: ["saddlebrown", "saddlebrown", "saddlebrown", "saddlebrown", "sienna", "sienna", "olive", "olive", "olivedrab"],
          "stroke-width": ["16", "11", "9", "7", "6", "5", "3", "2", "2", "1"],
          "stroke-linecap": ["square", "round"],
        }],
      },
      { // [AK]
        lid: "savine 1",
        params: [{
          axiom: "F-F[-F+F-F]+[+F-F-F]",
          rules: {
            F: "-F[-F+F-F]+[+F-F-F]-F[-F+F-F]+[+F-F-F]-F[-F+F-F]+[+F-F-F]",
          },
          theta: 20,
          step: 3.5,
          iterations: 3,
        }],
        attributes: [{
          stroke: ["#500", "#500", "#740", "#206000", "#387300"],
        }],
      },
      { // [AK]
        lid: "savine 2",
        params: [{
          axiom: "-[F-F[-F+F-F]+[+F-F-F]]+[F-F[-F+F-F]+[+F-F-F]]",
          rules: {
            F: "-F[-F+F-F]+[+F-F-F]-F[-F+F-F]+[+F-F-F]-F[-F+F-F]+[+F-F-F]",
          },
          theta: 20,
          step: 4,
          iterations: 3,
        }],
        attributes: [{
          stroke: ["#300", "#600", "#740", "#206000", "#327100"],
          style: ["opacity: 1;", "opacity: 0.9;", "filter: drop-shadow(0 0 0 #030); opacity: 0.85;", "filter: drop-shadow(0 0 0 #030); opacity: 0.8;"],
        }],
      },
      {
        lid: "sticks",
        params: [{
          axiom: "X",
          rules: {
            F: "FF",
            X: "F[+X]F[-X]+X",
          },
          alpha: 90,
          theta: 20,
          step: 2,
          iterations: 7,
        }],
        attributes: [{
          stroke: ["#260", "#160", "#080", "#080", "#8a0"],
          "stroke-width": ["1.5", "1"],
        }],
      },
      {
        lid: "tree",
        params: [{
          axiom: "F",
          rules: {
            F: "-F[-F+F-F]+[+F-F-F]",
          },
          theta: 20,
          step: 15,
          iterations: 5,
        }],
        attributes: [{
          stroke: ["#420", "#420", "#420", "#123202", "#476600cc", "#498800b3"],
          "stroke-width": ["7", "6", "5", "3", "2", "1"],
        }],
      },
      {
        lid: "tree 2",
        params: [{
          axiom: "FFF+FFFF-FF+FF-[-Y][+Y][Z][+!Z!]",
          rules: {
            F: "F",
            Y: "FF+F-F-F[FFFZ][+Z]-F-FZ",
            Z: "FF-F+F+F[FY][-Y]+F+F++Y",
          },
          alpha: 90,
          theta: 10,
          step: 6,
          iterations: 7,
        }],
        attributes: [{
          stroke: ["#6f4d35", "#6f4d35", "#5f4d35", "#55771c", "#55771c", "#44621c", "#83a35a80", "#a4b86680", "#c0c86180"],
          "stroke-width": ["13", "6", "3", "1"],
          "stroke-linecap": ["square", "square", "round"],
          transform: ["skewY(-35)", "n/a"],
        }],
      },
      { // [VB]
        lid: "tree 3",
        params: [{
          axiom: "X",
          rules: {
            F: "FF",
            X: "F+[-F-XF-X][+FF][--XF[+X]][++F-X]",
          },
          alpha: 90,
          theta: 20,
          step: 4,
          iterations: 6,
        }],
        attributes: [{
          stroke: ["saddlebrown", "saddlebrown", "saddlebrown", "forestgreen"],
          "stroke-width": ["6", "4", "2", "1"],
          "stroke-linecap": ["round", "round", "n/a"],
        }],
      },
      {
        lid: "weed",
        params: [{
          axiom: "F",
          rules: {
            F: "F[+F]F[-F]F",
          },
          alpha: 90,
          theta: 25.714,
          step: 2,
          iterations: 5,
        }],
        attributes: [{
          stroke: ["#080", "#080", "#080", "#9a0"],
          "stroke-width": ["1.5", "1"],
        }],
      },
    ],
  },

  {
    cid: "Shapes",
    items: [
      { // [AH]
        lid: "ADH309a",
        params: [{
          axiom: "F+++F",
          rules: {
            F: "F+FF++F++F-F++FF",
          },
          alpha: 180,
          theta: 60,
          step: 3,
          iterations: 5,
        }],
      },
      {
        lid: "basket",
        params: [
          {
            axiom: "S",
            rules: {
              F: "F",
              S: "[[L]D[L]DD[L]D]-S",
              D: "FF++++++++++++++++++",
              L: "+++++++++F",
            },
            theta: 5,
            step: 100,
            iterations: 73,
          },
          {
            axiom: "A",
            rules: {
              A: "F+A",
              F: "F",
            },
            x: -20,
            y: -285,
            theta: 8,
            step: 40,
            iterations: 45,
          },
        ],
        attributes: [
          {
            stroke: ["slateblue", "crimson"],
            "stroke-width": ["1.5", "2"],
            "stroke-dasharray": ["n/a", "10 3"],
          },
          {
            stroke: "slateblue",
            "stroke-width": "8",
          },
        ],
      },
      {
        lid: "carpet",
        params: [{
          axiom: "F-F-F-F",
          rules: {
            F: "F[F]-F+F[--F]+F-F",
          },
          theta: 90,
          step: 3,
          iterations: 5,
        }],
        attributes: [{
          stroke: ["gold", "brown"],
        }],
      },
      {
        lid: "crystal",
        params: Array.from({length: 6}, () => ({
          axiom: "F+F+F+F",
          rules: {
            F: "FF+F++F+F",
          },
          theta: 90,
          step: 8,
          iterations: 4,
        })),
        attributes: Array.from({length: 6}, (_el, index) => ({
          stroke: index < 3 ? "#66cdaa40" : "#66cdaa",
          "stroke-width": "2",
          transform: [
            "scale(-0.2 0.5) translate(-1025 265) skewY(20)",
            "scale(0.5) translate(410 265)",
            "scale(0.5 -0.18) translate(152 -3190) skewX(21.5)",
            "scale(0.5) translate(150 500)",
            "scale(-0.2 0.5) translate(-2645 264) skewY(20)",
            "scale(0.5 -0.18) translate(153 -1385) skewX(21.5)",
          ][index],
        })),
      },
      { // [SF]
        lid: "Dekking’s church",
        params: [{
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
        }],
        attributes: [{
          "stroke": "mediumslateblue",
          "stroke-width": "1.5",
        }],
      },
      { // [SF]
        lid: "doily",
        params: [{
          axiom: "F--F--F--F--F--F",
          rules: {
            F: "-F[--F--F]++F[++F--F]--F+",
          },
          theta: 30,
          step: 5,
          iterations: 4,
        }],
        attributes: [{
          stroke: ["cornflowerblue", "cornflowerblue", "gold", "cornflowerblue"],
          "stroke-width": "1.5",
        }],
      },
      {
        lid: "double Penrose",
        params: [{
          axiom: "[X][Y]++[X][Y]++[X][Y]++[X][Y]++[X][Y]",
          rules: {
            W: "YF++ZF----XF[-YF----WF]++",
            X: "+YF--ZF[---WF--XF]+",
            Y: "-WF++XF[+++YF++ZF]-",
            Z: "--YF++++WF[+ZF++++XF]--XF",
          },
          theta: 36,
          step: 25,
          iterations: 5,
        }],
        attributes: [{
          stroke: "forestgreen",
          "stroke-width": "2",
          "stroke-linejoin": "round",
        }],
      },
      {
        lid: "fluffy globule",
        params: [{
          axiom: "X-X-X-X-X-X-X-X-X",
          rules: {
            X: "FX+X--X+X--X+X--X+X",
          },
          theta: 40,
          step: 18,
          iterations: 4,
        }],
      },
      { // [MR*]
        lid: "hexagonal star",
        params: [{
          axiom: "L",
          rules: {
            L: "L-FR--FR-F++LF++L-F+LF+R-",
            R: "+L-FR-F+R--FR--F+LF++LF+R",
          },
          alpha: -60,
          theta: 60,
          step: 4.75,
          iterations: 5,
        }],
      },
      { // [SF]
        lid: "hex",
        params: [{
          axiom: "F",
          rules: {
            F: "-F+F+G[+F+F]-",
            G: "GG",
          },
          alpha: -30,
          theta: 60,
          step: 10,
          iterations: 7,
        }],
        attributes: [{
          stroke: "dodgerblue",
          "stroke-width": "1.5",
        }],
      },
      { // [MR]
        lid: "HexGasket",
        params: [{
          axiom: "F+F+F+F+F+F--",
          rules: {
            F: "F+F+F--F--F+F+F",
          },
          theta: 60,
          step: 3,
          iterations: 4,
        }],
      },
      { // [AH]
        lid: "horizons",
        params: [{
          axiom: "+F|F",
          rules: {
            F: "F+F+F|F+F+F",
          },
          theta: 45,
          step: 1.5,
          iterations: 5,
        }],
      },
      {
        lid: "island",
        params: [{
          axiom: "F+F+F+F",
          rules: {
            F: "F+F-F-FFF+F+F-F",
          },
          theta: 90,
          step: 4,
          iterations: 3,
        }],
        attributes: [{
          fill: "forestgreen",
          "fill-opacity": "0.8",
          "paint-order": "stroke",
          stroke: "peru",
          "stroke-linejoin": "round",
          "stroke-width": "6",
          style: "filter: drop-shadow(0 4px 1px navy) blur(1px)",
        }],
      },
      {
        lid: "Levi’s carpet",
        params: [{
          axiom: "F++F++F++F",
          rules: {
            F: "+F--F+",
          },
          theta: 45,
          step: 2,
          iterations: 14,
        }],
      },
      {
        lid: "Levi’s fractal",
        params: [{
          axiom: "F",
          rules: {
            F: "+F--F+",
          },
          alpha: 180,
          theta: 45,
          step: 2,
          iterations: 14,
        }],
      },
      {
        lid: "mosaic",
        params: [{
          axiom: "F-F-F-F",
          rules: {
            F: "F-B+FF-F-FF-FB-FF+B-FF+F+FF+FB+FFF",
            B: "BBBBBB",
          },
          theta: 90,
          step: 7,
          iterations: 2,
        }],
        attributes: [{
          stroke: "olive",
          "stroke-width": "1.5",
        }],
      },
      { // [AM]
        lid: "napkin",
        params: [{
          axiom: "F--F--F--F--F--F",
          rules: {
            F: "-F[--F--F]++F--F+",
          },
          theta: 30,
          step: 5,
          iterations: 4,
        }],
        attributes: [{
          stroke: ["cornflowerblue", "mediumorchid"],
          "stroke-width": ["2", "1"],
        }],
      },
      { // [HS*]
        lid: "Penrose mosaic",
        params: [{
          axiom: "+W--X---Y--Z",
          rules: {
            W: "YF++ZF----XF[-YF----WF]++",
            X: "+YF--ZF[---WF--XF]+",
            Y: "-WF++XF[+++YF++ZF]-",
            Z: "--YF++++WF[+ZF++++XF]--XF",
          },
          alpha: 270,
          theta: 36,
          step: 14,
          iterations: 6,
        }],
        attributes: [{
          stroke: "forestgreen",
          "stroke-width": "1.5",
          "stroke-linejoin": "round",
        }],
      },
      { // [HS]
        lid: "Penrose tesselation",
        params: [{
          axiom: "[X]++[X]++[X]++[X]++[X]",
          rules: {
            W: "YF++ZF----XF[-YF----WF]++",
            X: "+YF--ZF[---WF--XF]+",
            Y: "-WF++XF[+++YF++ZF]-",
            Z: "--YF++++WF[+ZF++++XF]--XF",
          },
          theta: 36,
          step: 20,
          iterations: 5,
        }],
        attributes: [{
          stroke: "forestgreen",
          "stroke-width": "1.5",
          "stroke-linejoin": "round",
        }],
      },
      { // [WM]
        lid: "pentant",
        params: [{
          axiom: "X-X-X-X-X",
          rules: {
            X: "FX-FX-FX+FY+FY+FX-FX",
            Y: "FY+FY-FX-FX-FY+FY+FY",
          },
          theta: 72,
          step: 3,
          iterations: 4,
        }],
      },
      { // [WM]
        lid: "pentigree",
        params: [{
          axiom: "F-F-F-F-F",
          rules: {
            F: "F-F++F+F-F-F",
          },
          theta: 72,
          step: 5,
          iterations: 4,
        }],
      },
      {
        lid: "rack-wheel",
        params: [{
          axiom: "A+A",
          rules: {
            A: "F++++++F",
            F: "A|++A",
          },
          theta: 10,
          step: 60,
          iterations: 9,
        }],
        attributes: [{
          stroke: "white",
          fill: "steelblue",
        }],
      },
      { // [AK]
        lid: "sea urchin",
        params: [{
          axiom: "F",
          rules: {
            F: "F[-F+F-F]+[+F-F-F]",
          },
          theta: 20,
          step: 15,
          iterations: 5,
        }],
        attributes: [{
          stroke: ["#800", "#800", "#800", "#971a8b", "#804", "#e5a9a91f"],
          transform: ["n/a", "n/a", "n/a", "n/a", "n/a", "scale(0.85)"],
        }],
      },
      {
        lid: "Sierpinski carpet",
        params: [{
          axiom: "FXF--FF--FF",
          rules: {
            F: "FF",
            X: "--FXF++FXF++FXF--",
            Y: "-FX-Y",
          },
          theta: 60,
          step: 7,
          iterations: 5,
        }],
      },
      {
        lid: "snowflake",
        params: [{
          axiom: "[F]+[F]+[F]+[F]+[F]+[F]",
          rules: {
            F: "F[++F][-FF]FF[+F][-F]FF",
          },
          theta: 60,
          step: 2,
          iterations: 3,
        }],
        attributes: [{
          stroke: "deepskyblue",
        }],
      },
      { // [SE*]
        lid: "snowflake 2",
        params: [{
          axiom: "[X]++[X]++[X]++[X]",
          rules: {
            X: "[+Y][-Y][++Y][--Y]",
            Y: "YF[X]YF",
          },
          theta: 45,
          step: 1,
          iterations: 9,
        }],
        attributes: [{
          stroke: "deepskyblue",
        }],
      },
      { // [HS]
        lid: "sphinx",
        params: [{
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
        }],
        attributes: [{
          stroke: "sandybrown",
          "stroke-linejoin": "round",
          "stroke-width": "2.5",
        }],
      },
      { // [PP*]
        lid: "spiral tiling",
        params: [{
          axiom: "AAAA",
          rules: {
            F: "F",
            A: "X+X+X+X+X+X+",
            X: "[F+F+F+F[---X-Y]+++++F|----F-F-F-F]",
            Y: "[F+F+F+F[---Y]+++++F|----F-F-F-F]",
          },
          theta: 15,
          step: 10,
          iterations: 5,
        }],
      },
      {
        lid: "square",
        params: [{
          axiom: "F+F+F+F",
          rules: {
            F: "FF+F+F+F+FF",
          },
          theta: 90,
          step: 5,
          iterations: 4,
        }],
        attributes: [{
          stroke: "forestgreen",
          "stroke-width": "1.5",
        }],
      },
      { // [SE*]
        lid: "wheel",
        params: [{
          axiom: "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
          rules: {
            W: "[X]+",
            X: "[+++++++++++++Y[X]]-------------Y[X]",
            Y: "YFYF",
          },
          theta: 5,
          step: 2,
          iterations: 8,
        }],
      },
      {
        lid: "wire globule",
        params: [{
          axiom: "F",
          rules: {
            F: "FF-F-FF+",
          },
          theta: 35,
          step: 25,
          iterations: 5,
        }],
      },
      { // [WM]
        lid: "Xmas tree",
        params: [
          {
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
          },
          {
            axiom: "A",
            rules: {
              A: "F|+F++A",
              F: "F",
            },
            x: -175,
            y: -570,
            alpha: 36,
            theta: 36,
            step: 25,
            iterations: 5,
          },
        ],
        attributes: [
          {
            fill: "limegreen",
            stroke: "darkgreen",
            "stroke-dasharray": "5 2",
            "stroke-width": "6",
          },
          {
            fill: "orange",
            stroke: "orangered",
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            "stroke-width": "7",
          },
        ],
      },
    ],
  },
];

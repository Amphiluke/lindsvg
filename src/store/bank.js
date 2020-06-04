/*
The comments at the L-system names contain information on the L-system authors
or reference the source the L-system parameters were taken from:

* [AH] — Anthony Hanmer
* [AK] — A.V. Kalmykov
* [AM] — Adrian Mariano
* [HS] — Herb Savage
* [GT] — Gary Teachout
* [KP] — Ken Philip
* [MR] — Michael A. Rouse
* [PB] — Paul Bourke
* [PP] — from P. Prusinkiewicz & J. Hanan, 1989
* [SE] — SirEdvin
* [WM] — William McWorter

An asterisk (*) near the reference means that the original L-system parameters
were modified by me (for optimisation purposes)

I apologize to the authors of L-systems going without any attribution.
Any help with affiliation of those L-systems is appreciated.
*/

export default [
  {
    cid: "Curves",
    items: [
      { // [PP]
        lid: "anklets of Krishna",
        axiom: "-X--X",
        rules: {
          F: "F",
          X: "XFX--XFX"
        },
        alpha: 0,
        theta: 45,
        iterations: 5,
        step: 10
      },
      {
        lid: "chain",
        axiom: "F+F+F+F",
        rules: {
          F: "F+B-F-FFF+F+B-F",
          B: "BBB"
        },
        alpha: 0,
        theta: 90,
        iterations: 3,
        step: 4
      },
      {
        lid: "cross",
        axiom: "X",
        rules: {
          X: "FX+FX+FXFY-FY-",
          Y: "+FX+FXFY-FY-FY"
        },
        alpha: 0,
        theta: 90,
        iterations: 5,
        step: 4.5
      },
      {
        lid: "curve",
        axiom: "F-F-F-F-",
        rules: {
          F: "FF-F-F-F-F-F+F"
        },
        alpha: 0,
        theta: 90,
        iterations: 4,
        step: 3.5
      },
      { // [WM]
        lid: "frame",
        axiom: "YXY-YXY-YXY-YXY",
        rules: {
          X: "FX+FX+FXFYFX+FXFY-FY-FY-",
          Y: "+FX+FX+FXFY-FYFXFY-FY-FY"
        },
        alpha: 0,
        theta: 90,
        iterations: 3,
        step: 4
      },
      {
        lid: "Gosper curve",
        axiom: "XF",
        rules: {
          F: "F",
          X: "X+YF++YF-FX--FXFX-YF+",
          Y: "-FX+YFYF++YF+FX--FX-Y"
        },
        alpha: 0,
        theta: 60,
        iterations: 4,
        step: 8
      },
      { // [GT*]
        lid: "Hex-7-b",
        axiom: "X",
        rules: {
          X: "-F++F-X-F--F+Y---F--F+Y+F++F-X+++F++F-X-F++F-X+++F--F+Y--",
          Y: "+F++F-X-F--F+Y+F--F+Y---F--F+Y---F++F-X+++F++F-X+++F--F+Y"
        },
        alpha: 0,
        theta: 30,
        iterations: 4,
        step: 5
      },
      {
        lid: "Hilbert curve",
        axiom: "X",
        rules: {
          F: "F",
          X: "-YF+XFX+FY-",
          Y: "+XF-YFY-FX+"
        },
        alpha: 0,
        theta: 90,
        iterations: 6,
        step: 7
      },
      {
        lid: "island",
        axiom: "F+F+F+F",
        rules: {
          F: "F+F-F-FFF+F+F-F"
        },
        alpha: 0,
        theta: 90,
        iterations: 3,
        step: 4
      },
      {
        lid: "Koch’s curve",
        axiom: "F+F+F+F",
        rules: {
          F: "FF+F+F+F+F+F-F"
        },
        alpha: 0,
        theta: 90,
        iterations: 4,
        step: 3.5
      },
      {
        lid: "Koch’s snowflake",
        axiom: "F++F++F",
        rules: {
          F: "F-F++F-F"
        },
        alpha: 0,
        theta: 60,
        iterations: 4,
        step: 5
      },
      { // [WM]
        lid: "lace",
        axiom: "W",
        rules: {
          F: "F",
          W: "+++X--F--ZFX+",
          X: "---W++F++YFW-",
          Y: "+ZFX--F--Z+++",
          Z: "-YFW++F++Y---"
        },
        alpha: 180,
        theta: 30,
        iterations: 7,
        step: 4.5
      },
      { // [PP]
        lid: "mango-tree foliage",
        axiom: "A---A",
        rules: {
          F: "F",
          B: "B",
          A: "B-F+Z+F-BA",
          Z: "F-FF-F--[--Z]F-FF-F--F-FF-F--"
        },
        alpha: 0,
        theta: 60,
        iterations: 7,
        step: 15
      },
      {
        lid: "Moore curve",
        axiom: "LFL+F+LFL",
        rules: {
          F: "F",
          L: "-RF+LFL+FR-",
          R: "+LF-RFR-FL+"
        },
        alpha: 90,
        theta: 90,
        iterations: 5,
        step: 7
      },
      { // [WM]
        lid: "Moore’s curl",
        axiom: "X",
        rules: {
          X: "FX+FX+FXFYFX+FXFY-FY-FY-",
          Y: "+FX+FX+FXFY-FYFXFY-FY-FY"
        },
        alpha: 180,
        theta: 90,
        iterations: 4,
        step: 3.5
      },
      {
        lid: "Peano curve",
        axiom: "F",
        rules: {
          F: "F-F+F+F+F-F-F-F+F"
        },
        alpha: 45,
        theta: 90,
        iterations: 4,
        step: 8
      },
      { // [GT]
        lid: "Peano-c",
        axiom: "+Z",
        rules: {
          X: "FX-FY-FX+FY+FX+FY+FX+FY+FX-FY-FX-FY-FX-FY-FX+FY+FX",
          Y: "FY",
          Z: "FX"
        },
        alpha: 0,
        theta: 45,
        iterations: 5,
        step: 3.5
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
          U: "-FQ++FT-"
        },
        alpha: 36,
        theta: 36,
        iterations: 7,
        step: 15
      },
      {
        lid: "Sierpinski arrowhead curve",
        axiom: "A",
        rules: {
          A: "FC-FA-FC",
          C: "FA+FC+FA"
        },
        alpha: 180,
        theta: 60,
        iterations: 8,
        step: 3
      },
      {
        lid: "Sierpinski curve",
        axiom: "F+FX+F+XF",
        rules: {
          F: "F",
          X: "XF-F+F-XF+F+XF-F+F-X"
        },
        alpha: 45,
        theta: 90,
        iterations: 4,
        step: 8
      },
      { // [WM]
        lid: "Sierpinski median curve",
        axiom: "L--F--L--F",
        rules: {
          F: "F",
          L: "+R-F-R+",
          R: "-L+F+L-"
        },
        alpha: 0,
        theta: 45,
        iterations: 10,
        step: 5
      }
    ]
  },

  {
    cid: "Dragons",
    items: [
      {
        lid: "dragon",
        axiom: "FX",
        rules: {
          F: "F",
          X: "X+YF+",
          Y: "-FX-Y"
        },
        alpha: 0,
        theta: 90,
        iterations: 12,
        step: 5
      },
      {
        lid: "median dragon",
        axiom: "-X",
        rules: {
          F: "F",
          X: "X+F+Y",
          Y: "X-F-Y"
        },
        alpha: 0,
        theta: 45,
        iterations: 12,
        step: 3
      },
      {
        lid: "terdragon",
        axiom: "F",
        rules: {
          F: "F+F-F"
        },
        alpha: 120,
        theta: 120,
        iterations: 8,
        step: 6
      }
    ]
  },

  {
    cid: "Miscellaneous",
    items: [
      { // [AH]
        lid: "Cesaro 1",
        axiom: "F",
        rules: {
          F: "F++++++++++F--------------------F++++++++++F"
        },
        alpha: 180,
        theta: 8,
        iterations: 6,
        step: 2.9
      },
      { // [AH*]
        lid: "Cesaro 2",
        axiom: "AAAA",
        rules: {
          A: "F+++++++++F------------------",
          F: "F++++++++F----------------F++++++++F"
        },
        alpha: 0,
        theta: 10,
        iterations: 6,
        step: 4
      },
      {
        lid: "rack-wheel",
        axiom: "A+A",
        rules: {
          A: "F++++++F",
          F: "A----------------A"
        },
        alpha: 0,
        theta: 10,
        iterations: 9,
        step: 60
      },
      { // [AK]
        lid: "urchin",
        axiom: "F",
        rules: {
          F: "F[-F+F-F]+[+F-F-F]"
        },
        alpha: 0,
        theta: 20,
        iterations: 5,
        step: 15,
        attributes: {
          stroke: ["#800", "#800", "#800", "#971a8b", "#804", "rgba(229,169,169,0.12)"],
          transform: ["", "", "", "", "", "scale(0.85)"]
        }
      }
    ]
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
          W: "FFFFFV[+++H][---Q]BC"
        },
        alpha: 90,
        theta: 12,
        iterations: 17,
        step: 2,
        attributes: {
          stroke: "seagreen"
        }
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
          Z: "+FFFFFY[++++N][----T]BC"
        },
        alpha: 90,
        theta: 12,
        iterations: 17,
        step: 2,
        attributes: {
          stroke: "seagreen"
        }
      },
      {
        lid: "bonsai branch",
        axiom: "A",
        rules: {
          F: "F",
          A: "F-FFA+[FAFA+FFF]F"
        },
        alpha: 90,
        theta: 30,
        iterations: 5,
        step: 7,
        attributes: {
          stroke: "#080",
          "stroke-width": ["4", "3", "2", "1"],
          "stroke-linecap": "round"
        }
      },
      {
        lid: "bush 1",
        axiom: "F",
        rules: {
          F: "F[+FF][-FF]F[-F][+F]F"
        },
        alpha: 90,
        theta: 35,
        iterations: 4,
        step: 6,
        attributes: {
          stroke: ["#480", "#480", "#9a0", "#9a0", "#ea0"]
        }
      },
      {
        lid: "bush 2",
        axiom: "F",
        rules: {
          F: "FF+[+F-F-F]-[-F+F+F]"
        },
        alpha: 90,
        theta: 22.5,
        iterations: 4,
        step: 9,
        attributes: {
          stroke: ["#380", "#480", "#690", "#690", "#cb0"],
          "stroke-width": ["4", "3", "2", "1"]
        }
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
          Z: "[-FFF][+FFF]F"
        },
        alpha: 90,
        theta: 20,
        iterations: 9,
        step: 10
      },
      {
        lid: "dandelion",
        axiom: "FFFFFF[-Y][Z][+Z]",
        rules: {
          F: "F",
          Y: "FF+F-F-F[FFFZ][+Z]-F-FZ",
          Z: "FF-F+F+F[Y][-Y]+F+FY"
        },
        alpha: 90,
        theta: 15,
        iterations: 7,
        step: 5,
        attributes: {
          stroke: ["#690", "#7a0", "#9a0", "#aa0", "#aa0", "#cb0", "#dd0", "#ed0"],
          "stroke-width": ["5", "2", "2", "1"],
          "stroke-linecap": "square"
        }
      },
      {
        lid: "flower 1",
        axiom: "F[+F+F][-F-F][++F][--F]F",
        rules: {
          F: "FF[++F][+F][F][-F][--F]"
        },
        alpha: 90,
        theta: 11.25,
        iterations: 3,
        step: 15,
        attributes: {
          stroke: ["#080", "#080", "#080", "#9a0", "#e80"],
          "stroke-width": ["3", "1"]
        }
      },
      {
        lid: "flower 2",
        axiom: "F-F+F[++X][F+X][F-X][--X]",
        rules: {
          F: "F",
          W: "F-F+F[++X][F+X][F-X][--X]",
          X: "F+FF-F[++Y][+Y][-Z][--Z]",
          Y: "-[Z]F-FF-FF-FF-F[Z]",
          Z: "+[Y]F+FF+FF+FF+F[Y]"
        },
        alpha: 90,
        theta: 10,
        iterations: 9,
        step: 4.5,
        attributes: {
          stroke: "#d50", // "url(#gradient)",
          "stroke-width": "1.5"
        }
      },
      { // [AK]
        lid: "liana sarment",
        axiom: "FYX",
        rules: {
          F: "FFFXYFXY-[FFFXYFXY]",
          X: "Y[[XY]+X]+F[+FX]+XF",
          Y: "[FFF[[YX]+Y]+F[+FY]+F]"
        },
        alpha: 90,
        theta: 20,
        iterations: 4,
        step: 0.8,
        attributes: {
          stroke: "#080",
          "stroke-width": ["4", "3", "2", "1"]
        }
      },
      { // [AK]
        lid: "liana tangle",
        axiom: "FYX",
        rules: {
          F: "FFFXYFXY-[FFFXYFXY]",
          X: "Y[[XY]+X]+F[+FX]+XF",
          Y: "FFF[[YX]+Y]+F[+FY]+F"
        },
        alpha: 90,
        theta: 20,
        iterations: 4,
        step: 2,
        attributes: {
          stroke: "#080",
          "stroke-width": ["3", "2", "1"]
        }
      },
      {
        lid: "plant 1",
        axiom: "X",
        rules: {
          F: "FF",
          X: "F-[[X]+X]+F[+FX]-X"
        },
        alpha: 90,
        theta: 25,
        iterations: 6,
        step: 4,
        attributes: {
          stroke: ["#080", "#080", "#080", "#080", "#080", "#080", "#8a0"]
        }
      },
      {
        lid: "plant 2",
        axiom: "F",
        rules: {
          F: "F[+F]F[-F][F]"
        },
        alpha: 90,
        theta: 20,
        iterations: 5,
        step: 10,
        attributes: {
          stroke: ["#260", "#160", "#080", "#080", "#8a0", "#850"],
          "stroke-width": ["4", "2", "2", "1"]
        }
      },
      {
        lid: "plant 3",
        axiom: "X",
        rules: {
          F: "FF",
          X: "F[+X][-X]FX"
        },
        alpha: 90,
        theta: 25.71,
        iterations: 7,
        step: 2.5,
        attributes: {
          stroke: "#160",
          "stroke-width": ["2", "1"]
        }
      },
      {
        lid: "plant 4",
        axiom: "--------C",
        rules: {
          F: "F",
          C: "NF[--P]F+C",
          N: "NFF",
          P: "Q",
          Q: "C"
        },
        alpha: 0,
        theta: 11.25,
        iterations: 20,
        step: 1.2,
        attributes: {
          stroke: ["#260", "#160", "#080", "#080", "#6a0"],
          "stroke-width": ["3", "2", "2", "1"]
        }
      },
      { // [KP]
        lid: "plant 5",
        axiom: "----G",
        rules: {
          F: "F",
          G: "GFX[+G][-G]",
          X: "X[-FFF][+FFF]FX"
        },
        alpha: 0,
        theta: 25.7,
        iterations: 6,
        step: 4,
        attributes: {
          stroke: ["#260", "#160", "#080", "#080", "#8a0", "#aa0"]
        }
      },
      {
        lid: "plant 6",
        axiom: "X",
        rules: {
          F: "FF",
          X: "F-[[X]+Y]+F[+Y]-Y",
          Y: "F+[[Y]-X]-F[-X]+X"
        },
        alpha: 90,
        theta: 30,
        iterations: 7,
        step: 3,
        attributes: {
          stroke: ["#260", "#160", "#080", "#080", "#080", "#080", "#8a0"],
          "stroke-width": ["1.5", "1"]
        }
      },
      {
        lid: "sapling",
        axiom: "FFFFFFX",
        rules: {
          F: "F",
          X: "FFF-[-F+F[Y]-[X]]+[+F+F[X]-[X]]",
          Y: "FF-[-F+F]+[+F+FY]"
        },
        alpha: 90,
        theta: 15,
        iterations: 6,
        step: 10,
        attributes: {
          stroke: "#514d3a",
          "stroke-width": ["16", "11", "9", "7", "6", "5", "3", "2", "2", "1"],
          "stroke-linecap": ["square", "round"]
        }
      },
      { // [AK]
        lid: "savine 1",
        axiom: "F-F[-F+F-F]+[+F-F-F]",
        rules: {
          F: "-F[-F+F-F]+[+F-F-F]-F[-F+F-F]+[+F-F-F]-F[-F+F-F]+[+F-F-F]"
        },
        alpha: 0,
        theta: 20,
        iterations: 3,
        step: 3
      },
      { // [AK]
        lid: "savine 2",
        axiom: "-[F-F[-F+F-F]+[+F-F-F]]+[F-F[-F+F-F]+[+F-F-F]]",
        rules: {
          F: "-F[-F+F-F]+[+F-F-F]-F[-F+F-F]+[+F-F-F]-F[-F+F-F]+[+F-F-F]"
        },
        alpha: 0,
        theta: 20,
        iterations: 3,
        step: 3
      },
      {
        lid: "sticks",
        axiom: "X",
        rules: {
          F: "FF",
          X: "F[+X]F[-X]+X"
        },
        alpha: 90,
        theta: 20,
        iterations: 7,
        step: 2,
        attributes: {
          stroke: ["#260", "#160", "#080", "#080", "#8a0"],
          "stroke-width": ["1.5", "1"]
        }
      },
      {
        lid: "tree",
        axiom: "F",
        rules: {
          F: "-F[-F+F-F]+[+F-F-F]"
        },
        alpha: 0,
        theta: 20,
        iterations: 5,
        step: 15,
        attributes: {
          stroke: ["#420", "#420", "#420", "#123202", "rgba(71,102,0,0.8)", "rgba(73,136,0,0.7)"],
          "stroke-width": ["7", "6", "5", "3", "2", "1"]
        }
      },
      {
        lid: "weed",
        axiom: "F",
        rules: {
          F: "F[+F]F[-F]F"
        },
        alpha: 90,
        theta: 25.714,
        iterations: 5,
        step: 2,
        attributes: {
          stroke: ["#080", "#080", "#080", "#9a0"],
          "stroke-width": ["1.5", "1"]
        }
      }
    ]
  },

  {
    cid: "Shapes",
    items: [
      {
        lid: "crystal",
        axiom: "F+F+F+F",
        rules: {
          F: "FF+F++F+F"
        },
        alpha: 0,
        theta: 90,
        iterations: 4,
        step: 5,
        attributes: {
          stroke: "#080",
          "stroke-width": "1.5"
        }
      },
      {
        lid: "fluffy globule",
        axiom: "X-X-X-X-X-X-X-X-X",
        rules: {
          X: "FX+X--X+X--X+X--X+X"
        },
        alpha: 0,
        theta: 40,
        iterations: 4,
        step: 18
      },
      { // [MR*]
        lid: "hexagonal star",
        axiom: "L",
        rules: {
          L: "L-FR--FR-F++LF++L-F+LF+R-",
          R: "+L-FR-F+R--FR--F+LF++LF+R"
        },
        alpha: -60,
        theta: 60,
        iterations: 5,
        step: 4.75
      },
      { // [MR]
        lid: "HexGasket",
        axiom: "F+F+F+F+F+F--",
        rules: {
          F: "F+F+F--F--F+F+F"
        },
        alpha: 0,
        theta: 60,
        iterations: 4,
        step: 3
      },
      { // [AH]
        lid: "horizons",
        axiom: "+F++++F",
        rules: {
          F: "F+F+F++++F+F+F"
        },
        alpha: 0,
        theta: 45,
        iterations: 5,
        step: 1.3
      },
      {
        lid: "Levi’s carpet",
        axiom: "F++F++F++F",
        rules: {
          F: "+F--F+"
        },
        alpha: 180,
        theta: 45,
        iterations: 14,
        step: 1.8
      },
      {
        lid: "Levi’s fractal",
        axiom: "F",
        rules: {
          F: "+F--F+"
        },
        alpha: 180,
        theta: 45,
        iterations: 14,
        step: 1.9
      },
      {
        lid: "mosaic",
        axiom: "F-F-F-F",
        rules: {
          F: "F-B+FF-F-FF-FB-FF+B-FF+F+FF+FB+FFF",
          B: "BBBBBB"
        },
        alpha: 0,
        theta: 90,
        iterations: 2,
        step: 7
      },
      { // [AM]
        lid: "napkin",
        axiom: "F--F--F--F--F--F",
        rules: {
          F: "-F[--F--F]++F--F+"
        },
        alpha: 0,
        theta: 30,
        iterations: 4,
        step: 4.5
      },
      { // [HS*]
        lid: "Penrose mosaic",
        axiom: "+W--X---Y--Z",
        rules: {
          W: "YF++ZF----XF[-YF----WF]++",
          X: "+YF--ZF[---WF--XF]+",
          Y: "-WF++XF[+++YF++ZF]-",
          Z: "--YF++++WF[+ZF++++XF]--XF"
        },
        alpha: 270,
        theta: 36,
        iterations: 6,
        step: 14,
        attributes: {
          stroke: "#080",
          "stroke-width": "1.5",
          "stroke-linejoin": "round"
        }
      },
      { // [HS]
        lid: "Penrose tesselation",
        axiom: "[X]++[X]++[X]++[X]++[X]",
        rules: {
          W: "YF++ZF----XF[-YF----WF]++",
          X: "+YF--ZF[---WF--XF]+",
          Y: "-WF++XF[+++YF++ZF]-",
          Z: "--YF++++WF[+ZF++++XF]--XF"
        },
        alpha: 0,
        theta: 36,
        iterations: 5,
        step: 20,
        attributes: {
          stroke: "#080",
          "stroke-width": "1.5",
          "stroke-linejoin": "round"
        }
      },
      { // [WM]
        lid: "pentigree",
        axiom: "F-F-F-F-F",
        rules: {
          F: "F-F++F+F-F-F"
        },
        alpha: 0,
        theta: 72,
        iterations: 4,
        step: 5
      },
      {
        lid: "Sierpinski carpet",
        axiom: "FXF--FF--FF",
        rules: {
          F: "FF",
          X: "--FXF++FXF++FXF--",
          Y: "-FX-Y"
        },
        alpha: 0,
        theta: 60,
        iterations: 5,
        step: 7
      },
      {
        lid: "snowflake",
        axiom: "[F]+[F]+[F]+[F]+[F]+[F]",
        rules: {
          F: "F[++F][-FF]FF[+F][-F]FF"
        },
        alpha: 0,
        theta: 60,
        iterations: 3,
        step: 2
      },
      { // [SE*]
        lid: "snowflake 2",
        axiom: "[X]++[X]++[X]++[X]",
        rules: {
          X: "[+Y][-Y][++Y][--Y]",
          Y: "YF[X]YF"
        },
        alpha: 0,
        theta: 45,
        iterations: 9,
        step: 1
      },
      { // [PP]
        lid: "spiral tiling",
        axiom: "AAAA",
        rules: {
          F: "F",
          A: "X+X+X+X+X+X+",
          X: "[F+F+F+F[---X-Y]+++++F++++++++F-F-F-F]",
          Y: "[F+F+F+F[---Y]+++++F++++++++F-F-F-F]"
        },
        alpha: 0,
        theta: 15,
        iterations: 5,
        step: 10
      },
      {
        lid: "square",
        axiom: "F+F+F+F",
        rules: {
          F: "FF+F+F+F+FF"
        },
        alpha: 0,
        theta: 90,
        iterations: 4,
        step: 5,
        attributes: {
          stroke: "#080",
          "stroke-width": "1.5"
        }
      },
      { // [SE*]
        lid: "wheel",
        axiom: "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
        rules: {
          W: "[X]+",
          X: "[+++++++++++++Y[X]]-------------Y[X]",
          Y: "YFYF"
        },
        alpha: 0,
        theta: 5,
        iterations: 8,
        step: 2
      }
    ]
  }
];

// Mutations that modify L-system parameters and attributes must be “LS_”-prefixed
export const LS_SET_AXIOM = "LS_SET_AXIOM";
export const LS_SET_ALPHA = "LS_SET_ALPHA";
export const LS_SET_THETA = "LS_SET_THETA";
export const LS_SET_STEP = "LS_SET_STEP";
export const LS_SET_ITERATIONS = "LS_SET_ITERATIONS";
export const LS_SET_RULE = "LS_SET_RULE";
export const LS_UNSET_RULE = "LS_UNSET_RULE";
export const LS_SET_ATTRIBUTE = "LS_SET_ATTRIBUTE";
export const LS_UNSET_ATTRIBUTE = "LS_UNSET_ATTRIBUTE";
export const LS_SETUP_L_SYSTEM = "LS_SETUP_L_SYSTEM";

// Other mutations do not modify L-system parameters/attributes
export const ADD_L_SYSTEM = "ADD_L_SYSTEM";
export const DELETE_L_SYSTEM = "DELETE_L_SYSTEM";
export const UPDATE_BANK = "UPDATE_BANK";
export const SET_SVG_CODE = "SET_SVG_CODE";
export const OPEN_PANEL = "OPEN_PANEL";

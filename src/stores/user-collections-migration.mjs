/** @import {LSystem} from "./bank.mjs" */

let userCollectionStorage = localStorage.getItem("userCollection");

if (userCollectionStorage) {
  try {
    let collection = JSON.parse(userCollectionStorage);
    if (Array.isArray(collection)) {
      let collectionV3 = collection.map((data) => /** @type {LSystem} */ ({
        lid: data.lid,
        params: [{
          axiom: data.axiom,
          rules: data.rules,
          x: 0,
          y: 0,
          alpha: data.alpha,
          theta: data.theta,
          step: data.step,
          iterations: data.iterations,
        }],
        attributes: [data.attributes],
      }));
      localStorage.setItem("userCollectionV3", JSON.stringify(collectionV3));
    }
  } finally {
    localStorage.removeItem("userCollection");
    window.location.reload();
  }
}

const STORAGE_KEY = "userCollection";
export const STORED_COLLECTION_ID = "User defined";

export function getStoredCollection() {
  let storedItems = [];
  try {
    storedItems = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch (e) {
    // do nothing
  }
  return {cid: STORED_COLLECTION_ID, items: storedItems};
}

export function storeLSystem(lSystemParams) {
  let storedItems = getStoredCollection().items;
  let storedLSystem = storedItems.find(({lid}) => lid === lSystemParams.lid);
  if (storedLSystem) {
    Object.assign(storedLSystem, lSystemParams);
  } else {
    storedItems.push(lSystemParams);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(storedItems));
}

export function deleteLSystem(lid) {
  let storedItems = getStoredCollection().items.filter(({lid: aLid}) => aLid !== lid);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(storedItems));
}

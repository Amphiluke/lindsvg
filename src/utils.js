export function debounce(fn, delay) {
  let timeoutID = null;
  return function (...args) {
    clearTimeout(timeoutID);
    timeoutID = setTimeout(() => fn.call(this, ...args), delay);
  };
}

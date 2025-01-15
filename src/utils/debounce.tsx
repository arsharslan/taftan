let timeout: NodeJS.Timeout ;
export var debounce = function(func: () => void, delay: number = 500) {
  clearTimeout(timeout);
  timeout = setTimeout(func, delay);
};
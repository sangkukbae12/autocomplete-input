export function debounce(fn: (...args: any[]) => any, wait: number = 300) {
  let timer: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...args);
    }, wait);
  };
}

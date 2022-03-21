export function debounceFrame(callback: (...args: any[]) => any) {
  let nextFrameCallback = -1;
  return () => {
    cancelAnimationFrame(nextFrameCallback);
    nextFrameCallback = requestAnimationFrame(callback);
  };
}

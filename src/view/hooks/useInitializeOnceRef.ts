import { MutableRefObject, useRef } from "react";

/**
 * Like `useRef`, but receives a factory function
 * that returns the ref's contents so that we don't
 * need to recreate them every render.
 */
export const useInitializeOnceRef = <T>(factory: () => T) => {
  const ref = useRef<T | null>(null);
  if (ref.current === null) {
    ref.current = factory();
  }

  return ref as MutableRefObject<T>;
};

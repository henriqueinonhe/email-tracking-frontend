import { useCallback, useRef } from "react";

export const useEffectEvent = <Args extends Array<unknown>, ReturnValue>(
  callback?: (...args: Args) => ReturnValue,
) => {
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  const wrappedCallback = useCallback((...args: Args) => {
    return callbackRef.current?.(...args);
  }, []);

  return wrappedCallback;
};

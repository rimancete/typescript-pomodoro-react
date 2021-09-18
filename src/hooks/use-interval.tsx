import { useEffect, useRef } from 'react';

export function useInterval<C extends CallableFunction>(
  callback: C,
  delay: number | null,
): void {
  const savedCallback = useRef<C>(callback);

  // Remember the latest callback if it changes.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    // Don't schedule if no delay is specified.
    if (delay === null) {
      return;
    }

    const id = setInterval(() => savedCallback.current(), delay);

    return () => clearInterval(id);
  }, [delay]);
}

import { useCallback, useEffect, useState } from "react";

const resizeThrottler = (
  actualResizeHandler: Function,
  throttle: number
) => () => {
  let resizeTimeout = null;
  if (!resizeTimeout) {
    resizeTimeout = setTimeout(() => {
      resizeTimeout = null;
      actualResizeHandler();
    }, throttle);
  }
};

function getSize(ref: React.RefObject<HTMLElement>) {
  const { current } = ref;
  if (current) {
    return current.getBoundingClientRect();
  }
  return null;
}

export function useContainerSize(
  ref: React.RefObject<HTMLElement>,
  throttle: number = 250
) {
  const [containerSize, setContainerSize] = useState(getSize(ref));

  const handleResize = useCallback(
    () => {
      setContainerSize(getSize(ref));
    },
    [ref]
  );

  // Bind event listener
  const onResize = resizeThrottler(handleResize, throttle);
  useEffect(
    () => {
      window.addEventListener("resize", onResize);
      return () => {
        window.removeEventListener("resize", onResize);
      };
    },
    [onResize]
  );

  // Initialize for ref
  useEffect(
    () => {
      handleResize();
    },
    [ref, handleResize]
  );

  return containerSize;
}

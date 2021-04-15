import { useCallback, useEffect, useState } from "react";

function useOffset(elRef, offset, cb) {
  const [scrolled, setScrolled] = useState(false);

  const onScroll = useCallback(() => {
    if (!elRef.current) return;

    const windowPos = window.scrollY;
    const placesFinderBottomPos =
      elRef.current.getBoundingClientRect().bottom + windowPos;
    const windowBottomPos = windowPos + window.innerHeight;
    const currentOffset = placesFinderBottomPos - windowBottomPos;

    if (currentOffset < offset) {
      if (!scrolled) {
        setScrolled(true);
        cb();
        setScrolled(false);
      }
    }
  }, [scrolled, cb, elRef, offset]);

  useEffect(() => {
    document.addEventListener("scroll", onScroll);

    return () => {
      document.removeEventListener("scroll", onScroll);
    };
  }, [onScroll]);
}

export default useOffset;

"use client";
// detect is click is outside a ref/element/react component
import { useEffect, useState } from "react";

const useOutsideClick = (
  ref: React.MutableRefObject<HTMLDivElement | null>,
) => {
  const [isOutsideClick, setIsOutsideClick] = useState(false);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOutsideClick(true);
      } else {
        setIsOutsideClick(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  return isOutsideClick;
};

export default useOutsideClick;

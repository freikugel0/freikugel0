import { useEffect, useState } from "react";

export const useIsMobile = (q = "(max-width: 767px)") => {
  const [isMobile, set] = useState(false);
  useEffect(() => {
    const m = window.matchMedia(q);
    const on = () => set(m.matches);
    on();
    m.addEventListener("change", on);
    return () => m.removeEventListener("change", on);
  }, [q]);
  return isMobile;
};

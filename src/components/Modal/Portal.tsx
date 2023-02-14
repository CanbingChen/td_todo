import type { FC } from "react";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

interface Props {
  children: React.ReactElement | React.ReactElement[];
}
const Portal: FC<Props> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  if (!containerRef.current) {
    containerRef.current = document.createElement("div");
    document.body.appendChild(containerRef.current);
  }

  useEffect(() => {
    return function cleanup() {
      if (containerRef.current) {
        document.body.removeChild(containerRef.current);
      }
    };
  }, []);

  return createPortal(children, containerRef.current);
};

export default Portal;

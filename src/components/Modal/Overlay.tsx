import type { FC } from "react";
import { useRef } from "react";
import CSSTransition from "react-transition-group/CSSTransition";
import styles from "./index.less";

interface Props {
  show: boolean;
}
const ModalOverlay: FC<Props> = ({ show }) => {
  const maskRef = useRef(null);
  return (
    <CSSTransition
      in={show}
      appear
      timeout={300}
      classNames={styles.show}
      unmountOnExit
      nodeRef={maskRef}
    >
      <div className={styles.overlay} ref={maskRef} />
    </CSSTransition>
  );
};

export default ModalOverlay;

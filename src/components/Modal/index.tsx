import { CloseOutlined } from "@ant-design/icons";
import { Button } from "antd";
import type { FC } from "react";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import CSSTransition from "react-transition-group/CSSTransition";
import styles from "./index.less";
import ModalOverlay from "./Overlay";
import Portal from "./Portal";

interface Props {
  visible: boolean;
  title: React.ReactNode;
  children: React.ReactNode | React.ReactNode[];
  footer?: React.ReactNode;
  destroyOnClose?: boolean;
  onCancel?: (e: React.MouseEvent) => void;
}
const Modal: FC<Props> = ({
  visible,
  title,
  children,
  onCancel,
  footer,
  destroyOnClose,
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [innerVisible, changeVisible] = useState(false);

  useEffect(() => {
    changeVisible(visible);
  }, [visible]);

  const handleClose = useCallback(
    (e: React.MouseEvent) => {
      changeVisible(false);
      if (onCancel) onCancel(e);
    },
    [onCancel]
  );

  const onAnimateLeave = useCallback(() => {
    if (wrapperRef.current) {
      wrapperRef.current.style.display = "none";
    }
  }, []);

  const onWrapperClick = useCallback(
    (e: React.MouseEvent) => {
      if (wrapperRef.current === e.target) {
        changeVisible(false);
        if (onCancel) onCancel(e);
      }
    },
    [onCancel]
  );

  const innerFooter = useMemo(() => {
    if (footer) return footer;
    return (
      <>
        <Button danger onClick={handleClose}>
          close
        </Button>
        <Button type="primary">confirm</Button>
      </>
    );
  }, [footer, handleClose]);
  if (destroyOnClose && !innerVisible) return null;
  return (
    <Portal>
      <ModalOverlay show={innerVisible} />
      <CSSTransition
        in={innerVisible}
        classNames={styles.show}
        timeout={300}
        onExited={onAnimateLeave}
        unmountOnExit
      >
        <div
          className={styles.modalWrap}
          ref={wrapperRef}
          onClick={onWrapperClick}
        >
          <div className={styles.modal}>
            <div className={styles.modalContent}>
              <span className={styles.modalclose} onClick={handleClose}>
                <CloseOutlined />
              </span>
              <div className={styles.modalHeader}>
                <div className={styles.modalTitle}>{title}</div>
              </div>
              <div className={styles.modalBody}>{children}</div>
              <div className={styles.footer}>{innerFooter}</div>
            </div>
          </div>
        </div>
      </CSSTransition>
    </Portal>
  );
};

export default Modal;

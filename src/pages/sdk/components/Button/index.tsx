import React, { FC, memo, useCallback } from "react";
import Icon from "@/components/Icon";
import styles from "./index.less";
import classnames from "classnames";

interface Props {
  icon?: string;
  children?: string | React.ReactElement;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const Button: FC<Props> = (props) => {
  const { children, icon, onClick } = props;

  const handleClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) onClick(e);
  }, []);
  return (
    <button
      className={classnames(styles.buttonWrapper, styles.success)}
      onClick={handleClick}
    >
      {Boolean(icon) && (
        <span className={styles.prefix}>
          <Icon type={icon as string}></Icon>
        </span>
      )}

      <span>{children}</span>
    </button>
  );
};

export default Button;

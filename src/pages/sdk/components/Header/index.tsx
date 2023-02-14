import { memo } from "react";
import { FC } from "react";
import styles from "./index.less";

interface Props {
  toolBar: React.ReactElement;
}
const Header: FC<Props> = ({ toolBar }) => {
  return (
    <h2 className={styles.wrapper}>
      <span>SDK Management</span>
      <div className={styles.toolBar}>{toolBar}</div>
    </h2>
  );
};

export default memo(Header);

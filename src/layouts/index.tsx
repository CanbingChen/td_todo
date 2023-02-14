import { Link, Outlet } from "umi";
import Menu from "@/components/Menu";
import styles from "./index.less";

export default function Layout() {
  return (
    <div className={styles.wrapper}>
      <Menu />
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
}

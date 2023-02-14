import { Link, useLocation } from "umi";
import { useMemo } from "react";
import ROTES from "@/config/rotes";
import IconFont from "@/components/Icon";
import classnames from "classnames";
import styles from "./index.less";

const Menu = () => {
  const { pathname } = useLocation();
  console.log(location, "location");
  const routesEle = useMemo(() => {
    return ROTES.filter((route) => !route.hidenInMenu).map((route) => {
      const { path, name, icon } = route;
      return (
        <Link
          to={path}
          key={path}
          className={classnames(styles.navItem, {
            [styles.active]: path.includes(pathname),
          })}
        >
          <li>
            <IconFont type={icon} />
            {name}
          </li>
        </Link>
      );
    });
  }, [pathname]);
  return (
    <div className={styles.navs}>
      <ul>{routesEle}</ul>
    </div>
  );
};

export default Menu;

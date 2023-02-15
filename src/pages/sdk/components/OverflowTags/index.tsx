import MatchSpan from "@/components/MatchSpan";
import { Tag } from "antd";
import Overflow from "rc-overflow";
import { useCallback } from "react";
import styles from "./index.less";

const OverflowTags = ({ data }) => {
  const renderItem = useCallback((item) => {
    return (
      <Tag>
        <MatchSpan content={item} />
      </Tag>
    );
  }, []);

  const renderRest = useCallback((items) => {
    if (items.length === 0) {
      return null;
    } else {
      return <span>+{items.length}</span>;
    }
  }, []);

  console.log(data, "data");
  return (
    <div className={styles.wrapper}>
      <Overflow
        data={data}
        renderItem={renderItem}
        renderRest={renderRest}
        maxCount={3}
      />
    </div>
  );
};

export default OverflowTags;

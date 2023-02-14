import Icon from "@/components/Icon";
import type { FC, InputHTMLAttributes, KeyboardEventHandler } from "react";
import { memo, useCallback, useEffect, useState } from "react";
import styles from "./index.less";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  value?: string;
  defaultValue?: string;
  width?: number;
  onPressEnter?: KeyboardEventHandler<HTMLInputElement>;
  onKeyDown?: KeyboardEventHandler<HTMLInputElement>;
}

const Input: FC<Props> = (props) => {
  const {
    width,
    defaultValue = "",
    onPressEnter,
    onKeyDown,
    onChange,
    ...rest
  } = props;
  const [value, setValue] = useState<string>(defaultValue);

  useEffect(() => {
    if (props.value) {
      setValue(props.value);
    }
  }, [props.value]);
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (value === undefined) {
        setValue(e.target.value);
      }
      if (onChange) {
        onChange(e);
      }
    },
    [onChange, value]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (onPressEnter && e.key === "Enter") {
        onPressEnter(e);
      }
      if (onKeyDown) onKeyDown(e);
    },
    [onKeyDown, onPressEnter]
  );
  return (
    <span className={styles.inputWrapper} style={{ width: width }}>
      <span className={styles.prefix}>
        <Icon type="icon-a-ESMiconset_Search" />
      </span>
      <input
        className={styles.input}
        onKeyDown={handleKeyDown}
        onChange={handleChange}
        {...rest}
      />
    </span>
  );
};

export default memo(Input);

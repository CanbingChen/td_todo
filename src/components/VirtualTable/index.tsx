import MatchSpan from "@/components/MatchSpan";
import type { TableProps } from "antd";
import { Table, theme } from "antd";
import classNames from "classnames";
import ResizeObserver from "rc-resize-observer";
import React, { useEffect, useRef, useState } from "react";
import { VariableSizeGrid as Grid } from "react-window";
import styles from "./index.less";

const VirtualTable = <RecordType extends object>(
  props: TableProps<RecordType>
) => {
  const { columns, scroll, dataSource } = props;
  const [tableWidth, setTableWidth] = useState(0);
  const { token } = theme.useToken();

  const widthColumnCount = columns!.filter(({ width }) => !width).length;
  const mergedColumns = columns!.map((column) => {
    if (column.width) {
      return column;
    }

    return {
      ...column,
      width: Math.floor(tableWidth / widthColumnCount),
    };
  });

  const gridRef = useRef<any>();
  const [connectObject] = useState<any>(() => {
    const obj = {};
    Object.defineProperty(obj, "scrollLeft", {
      get: () => {
        if (gridRef.current) {
          return gridRef.current?.state?.scrollLeft;
        }
        return null;
      },
      set: (scrollLeft: number) => {
        if (gridRef.current) {
          gridRef.current.scrollTo({ scrollLeft });
        }
      },
    });

    return obj;
  });

  const resetVirtualGrid = () => {
    gridRef.current?.resetAfterIndices({
      columnIndex: 0,
      shouldForceUpdate: true,
    });
  };

  useEffect(() => resetVirtualGrid, [tableWidth]);

  const renderVirtualList = (
    rawData: object[],
    { scrollbarSize, ref, onScroll }: any
  ) => {
    ref.current = connectObject;
    const totalHeight = rawData.length * 54;

    return (
      <Grid
        ref={gridRef}
        // className="virtual-grid"
        columnCount={mergedColumns.length}
        columnWidth={(index: number) => {
          const { width } = mergedColumns[index];
          return totalHeight > scroll!.y! && index === mergedColumns.length - 1
            ? (width as number) - scrollbarSize - 1
            : (width as number);
        }}
        height={scroll!.y as number}
        rowCount={rawData.length}
        rowHeight={() => 54}
        width={tableWidth}
        onScroll={({ scrollLeft }: { scrollLeft: number }) => {
          onScroll({ scrollLeft });
        }}
      >
        {({
          columnIndex,
          rowIndex,
          style,
        }: {
          columnIndex: number;
          rowIndex: number;
          style: React.CSSProperties;
        }) => {
          const record = rawData[rowIndex];
          const currentColumn = mergedColumns[columnIndex];
          const { render } = currentColumn;
          const ele = render ? (
            render(record[currentColumn.dataIndex], record, rowIndex)
          ) : (
            <MatchSpan content={record[currentColumn.dataIndex]} />
          );
          return (
            <div
              className={classNames("virtual-table-cell", {
                [styles.evenRow]: rowIndex % 2 === 1,
                "virtual-table-cell-last":
                  columnIndex === mergedColumns.length - 1,
              })}
              style={{
                ...style,
                boxSizing: "border-box",
                padding: token.padding,
                borderBottom: `${token.lineWidth}px ${token.lineType} ${token.colorSplit}`,
              }}
            >
              {ele}
            </div>
          );
        }}
      </Grid>
    );
  };

  return (
    <div>
      <ResizeObserver
        onResize={({ width }) => {
          setTableWidth(width);
        }}
      >
        <Table
          {...props}
          // className="virtual-table"
          columns={mergedColumns}
          pagination={false}
          components={{
            header: {
              cell: ({ children }) => {
                return <th className={styles.th}>{children}</th>;
              },
            },
            body: renderVirtualList,
          }}
        />
      </ResizeObserver>
      <div className={styles.footer}>Total:{dataSource?.length}</div>
    </div>
  );
};

export default VirtualTable;

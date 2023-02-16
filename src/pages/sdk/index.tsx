import Icon from "@/components/Icon";

import { SearchContext } from "@/components/MatchSpan";
import VirtualTable from "@/components/VirtualTable";
import { getSdkList } from "@/services/sdk";
import { useRequest, useSetState } from "ahooks";
import { Popconfirm } from "antd";
import classnames from "classnames";
import { produce } from "immer";
import { useCallback, useMemo, useState } from "react";
import Button from "./components/Button";
import EditModal from "./components/EditModal";
import Header from "./components/Header";
import Input from "./components/Input";
import OverflowTags from "./components/OverflowTags";
import styles from "./index.less";

const Sdk = () => {
  const { data, loading, mutate } = useRequest(getSdkList);
  const [editSdk, changeSelect] = useSetState({
    visible: false,
    id: -1,
    rowData: null,
  });

  const [search, changeSearch] = useState("");

  const handleCreate = useCallback(() => {
    changeSelect({
      visible: true,
      id: -1,
      rowData: null,
    });
  }, [changeSelect]);

  const handleEdit = useCallback(
    (id, rowData) => {
      changeSelect({
        visible: true,
        id,
        rowData,
      });
    },
    [changeSelect]
  );

  const onCloseModal = useCallback(() => {
    changeSelect({
      visible: false,
      id: -1,
    });
  }, [changeSelect]);

  const modalConfirm = useCallback(
    (rowData, id) => {
      const newData = produce(data, (draft) => {
        if (id > 0) {
          const index = draft.findIndex((r) => r.id === id);
          draft[index] = {
            id,
            ...rowData,
          };
        } else {
          draft.unshift({
            id: Date.now(),
            ...rowData,
          });
        }
      });
      mutate(newData);
      onCloseModal();
    },
    [data, mutate, onCloseModal]
  );

  const handleDelete = useCallback(
    (id) => {
      const newData = produce(data, (draft) => {
        // const index = draft.findIndex((r) => r.id === id);
        // if (index >= 0) {
        //   draft.splice(index, 1);
        // }
        return draft.filter((r) => r.id !== id);
      });
      console.log("newData", newData);
      mutate(newData);
    },
    [data, mutate]
  );

  const handleSearch = useCallback((e) => {
    changeSearch(e.target.value);
  }, []);

  const toolBar = useMemo(() => {
    return (
      <>
        <Input
          width={320}
          placeholder="Search client name,board name,tags,requestor"
          onPressEnter={handleSearch}
        />
        <Button onClick={handleCreate}>Create SDK</Button>
      </>
    );
  }, [handleCreate, handleSearch]);

  const columns = useMemo(() => {
    return [
      { title: "Client name", dataIndex: "clientName" },
      { title: "Board name", dataIndex: "boardName" },
      {
        title: "Tags",
        dataIndex: "tags",
        render: (tags) => {
          return <OverflowTags data={tags} />;
        },
      },
      { title: "Requestor", dataIndex: "requestor" },
      {
        title: "SDK script",
        render: () => {
          return (
            <a>
              <span>{"</>"}</span>
              <span>SDK</span>
            </a>
          );
        },
      },
      {
        title: "Actions",
        dataIndex: "clientName",
        render: (d, record) => {
          return (
            <>
              <span
                className={styles.btn}
                onClick={() => handleEdit(record.id, record)}
              >
                <Icon type="icon-a-ESMiconset_Edit" />
              </span>
              <Popconfirm
                title="Delete the SDK"
                description="Are you sure to delete this SDK?"
                okText="Yes"
                cancelText="No"
                onConfirm={() => handleDelete(record.id)}
              >
                <span className={classnames(styles.btn, styles.danger)}>
                  <Icon type="icon-a-ESMiconset_Delete" />
                </span>
              </Popconfirm>
            </>
          );
        },
      },
    ];
  }, [handleDelete, handleEdit]);

  const filterData = useMemo(() => {
    if (!data) return [];
    return data.filter((d) => {
      const { id, ...rest } = d;
      return Object.values(rest).some((v) => {
        return v.includes(search);
      });
    });
  }, [data, search]);

  return (
    <SearchContext.Provider value={search}>
      <div className={styles.wrapper}>
        <Header toolBar={toolBar} />
        <VirtualTable
          columns={columns}
          dataSource={filterData}
          scroll={{ y: 900, x: "100vw" }}
          loading={loading}
        />
        <EditModal
          {...editSdk}
          closeModal={onCloseModal}
          onConfirm={modalConfirm}
        />
      </div>
    </SearchContext.Provider>
  );
};

export default Sdk;

import Modal from "@/components/Modal";
import { getSdkList } from "@/services/sdk";
import { useRequest, useSetState } from "ahooks";
import { useCallback, useMemo } from "react";
import Button from "./components/Button";
import Header from "./components/Header";
import Input from "./components/Input";

const Sdk = () => {
  const { data, loading } = useRequest(getSdkList);
  const [editSdk, changeSelect] = useSetState({
    visible: false,
    id: -1,
    rowData: null,
  });

  console.log(data, "data");

  const handleCreate = useCallback(() => {
    changeSelect({
      visible: true,
      id: -1,
      rowData: null,
    });
  }, [changeSelect]);

  const onCloseModal = useCallback(() => {
    changeSelect({
      visible: false,
      id: -1,
    });
  }, [changeSelect]);

  const toolBar = useMemo(() => {
    return (
      <>
        <Input
          width={320}
          placeholder="Search client name,board name,tags,requestor"
        />
        <Button onClick={handleCreate}>Create SDK</Button>
      </>
    );
  }, [handleCreate]);

  console.log(editSdk.visible, "editSdk.visible");
  return (
    <div>
      <Header toolBar={toolBar} />
      <Modal visible={editSdk.visible} title="我是标题" onCancel={onCloseModal}>
        我是内容
      </Modal>
    </div>
  );
};

export default Sdk;

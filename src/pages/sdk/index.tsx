import { useMemo, useState } from "react";
import Header from "./components/Header";
import Input from "./components/Input";
import Button from "./components/Button";
import { getSdkList } from "@/services/sdk";
import { useRequest, useSetState } from "ahooks";

const Sdk = () => {
  const { data, loading } = useRequest(getSdkList);
  const {} = useSetState({
    visible: false,
    id: -1,
  });

  console.log(data, "data");

  const toolBar = useMemo(() => {
    return (
      <>
        <Input
          width={320}
          placeholder="Search client name,board name,tags,requestor"
        />
        <Button>Create SDK</Button>
      </>
    );
  }, []);

  return (
    <div>
      <Header toolBar={toolBar} />
    </div>
  );
};

export default Sdk;

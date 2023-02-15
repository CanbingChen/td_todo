import Icon from "@/components/Icon";
import Modal from "@/components/Modal";
import { DEFAULT_TAG_OPTIONS } from "@/pages/sdk/constants";
import { Form, Input, Select } from "antd";
import type { FC } from "react";
import { useCallback, useEffect } from "react";

interface Props {
  visible: boolean;
  id: number;
  rowData: any;
  closeModal: () => void;
  onConfirm: (rowData: any, isEdit: number) => {};
}

const EditModal: FC<Props> = ({
  closeModal,
  visible,
  id,
  rowData,
  onConfirm,
}) => {
  const [form] = Form.useForm();

  const { validateFields, setFieldsValue, resetFields } = form;

  useEffect(() => {
    if (visible && rowData) {
      setFieldsValue(rowData);
    }
  }, [rowData, setFieldsValue, visible]);

  useEffect(() => {
    if (!visible) resetFields();
  }, [resetFields, visible]);

  const confirm = useCallback(async () => {
    const values = await validateFields();
    onConfirm(values, id);
  }, [id, onConfirm, validateFields]);

  return (
    <Modal
      visible={visible}
      title="我是标题"
      onCancel={closeModal}
      onConfirm={confirm}
    >
      <Form
        name="sdk"
        form={form}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        layout="vertical"
        autoComplete="off"
      >
        <Form.Item
          label="Client name:"
          name="clientName"
          rules={[
            { required: true, message: "Please input your client name!" },
          ]}
        >
          <Input placeholder="Please input your client name" />
        </Form.Item>

        <Form.Item
          label="Board:"
          name="boardName"
          rules={[
            { required: true, message: "Please input your  Board name!" },
          ]}
        >
          <Input placeholder="Please input your  Board name" />
        </Form.Item>

        <Form.Item
          label={
            <>
              Tags{" "}
              <Icon
                type="icon-a-ESMiconset_info2"
                style={{ fontSize: "20px" }}
              />
              :
            </>
          }
          name="tags"
        >
          <Select
            options={DEFAULT_TAG_OPTIONS}
            mode="multiple"
            placeholder="Please select tags"
          />
        </Form.Item>

        <Form.Item
          label="Requestor:"
          name="requestor"
          rules={[{ required: true, message: "Please input your requestor!" }]}
        >
          <Input placeholder="Please input your requestor" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditModal;

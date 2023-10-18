import { useRouter } from "next/router";
import loadDirData from "../helpers/loadDirData";
import { Button, Divider, Form, Input, Modal, message } from "antd";
import { useEffect, useState } from "react";
import loadUserToken from "../../helpers/loadUserToken";

const FilesCreateFolderModal = ({
  setCreateFolderModalOpen,
  isCreateFolderModalOpen,
  tableData,
  setTableData,
}) => {
  const router = useRouter();
  const [userToken, setUserToken] = useState("");
  
  useEffect(() => {
    setUserToken(loadUserToken());
  }, []);

  return (
    <Modal
      title="Create folder"
      open={isCreateFolderModalOpen}
      onCancel={() => setCreateFolderModalOpen(false)}
      footer={null}
    >
      <Divider></Divider>
      <Form
        onFinish={async ({ folderName }) => {
          const url =
            router.query.p === undefined
              ? `${process.env.NEXT_PUBLIC_UPLOAD_HOST}/folder`
              : `${process.env.NEXT_PUBLIC_UPLOAD_HOST}/folder?root=${router.query.p}`;
          const response = await fetch(url, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${userToken}`,
            },
            method: "POST",
            body: JSON.stringify({ folder: folderName }),
          });

          if (!response.ok)
            message.error(`failed to create a folder: ${response.status}`);
          else message.success(`folder has been created successfully`);

          setCreateFolderModalOpen(false);
          setTableData(await loadDirData(router.query.p));
        }}
      >
        <Form.Item
          label="Create Folder"
          name="folderName"
          rules={[
            {
              required: true,
              message: "Please input the folder name!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 18,
            span: 6,
          }}
        >
          <Button type="primary" htmlType="submit">
            Create Folder
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default FilesCreateFolderModal;

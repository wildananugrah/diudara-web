import { PlusOutlined } from "@ant-design/icons";
import { Button, Dropdown } from "antd";
import Link from "next/link";
import { useState } from "react";
import FilesUploadFileModal from "./FilesUploadFileModal";
import FilesCreateFolderModal from "./FilesCreateFolderModal";

const FilesDropdownMainMenu = ({ tableData, setTableData }) => {
  const [isUploadFileModalOpen, setUploadFileModalOpen] = useState(false)
  const [isCreateFolderModalOpen, setCreateFolderModalOpen] = useState(false)

  const items = [
    {
      label: (
        <Link href="#" onClick={(e) => setUploadFileModalOpen(true)}>
          Upload a File
        </Link>
      ),
      key: "0",
    },
    {
      label: (
        <Link href="#" onClick={(e) => setCreateFolderModalOpen(true)}>
          Create Folder
        </Link>
      ),
      key: "1",
    },
  ];

  return (
    <>
      <Dropdown menu={{ items }} trigger={["click"]}>
        <Button type="primary" icon={<PlusOutlined />} size="large">
          Add Item
        </Button>
      </Dropdown>

      <FilesUploadFileModal
        isUploadFileModalOpen={isUploadFileModalOpen}
        setUploadFileModalOpen={setUploadFileModalOpen}
        setTableData={setTableData}
      />

      <FilesCreateFolderModal
        setCreateFolderModalOpen={setCreateFolderModalOpen}
        isCreateFolderModalOpen={isCreateFolderModalOpen}
        tableData={tableData}
        setTableData={setTableData}
      />
    </>
  );
};

export default FilesDropdownMainMenu;

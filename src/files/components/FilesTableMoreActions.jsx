import { Button, Dropdown } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import Link from "next/link";
import loadUserToken from "../../helpers/loadUserToken";
import FilesConfirmDeleteModal from "./FilesConfirmDeleteModal";
import { useEffect, useState } from "react";

const FilesTableMoreActions = ({ item, record, tableData, setTableData }) => {
  const [userToken, setUserToken] = useState("");
  const [confirmDeleteModal, setConfirmDeleteModal] = useState(false);
  const [currentRecord, setCurrentRecord] = useState({});

  const items = [
    {
      label: (
        <Link
          href={`${process.env.NEXT_PUBLIC_UPLOAD_HOST}/download?p=${record.info.path}&token=${userToken}`}
        >
          Download
        </Link>
      ),
      key: "0",
    },
    {
      label: (
        <Link
          href="#"
          style={{ color: "red" }}
          onClick={(e) => {
            setConfirmDeleteModal(true);
            setCurrentRecord(record);
          }}
        >
          Delete
        </Link>
      ),
      key: "1",
    },
  ];

  useEffect(() => {
    setUserToken(loadUserToken());
  });

  return (
    <>
      <Dropdown menu={{ items }} trigger={["click"]} placement="bottomLeft">
        <Button icon={<MoreOutlined />} />
      </Dropdown>

      <FilesConfirmDeleteModal
        currentRecord={currentRecord}
        confirmDeleteModal={confirmDeleteModal}
        setConfirmDeleteModal={setConfirmDeleteModal}
        tableData={tableData}
        setTableData={setTableData}
      />
      
    </>
  );
};

export default FilesTableMoreActions;

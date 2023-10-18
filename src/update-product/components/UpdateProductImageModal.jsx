import loadDirData from "@/src/files/helpers/loadDirData";
import { InboxOutlined } from "@ant-design/icons";
import { Breadcrumb, Divider, Modal, Progress, Table, Upload, message } from "antd";
import { useEffect, useState } from "react";
import genTableColumns from "../helpers/tableColumns";
import genBreadcrumbItems from "../helpers/genBreadcrumbItems";
import { useRouter } from "next/router";
import loadUserToken from "@/src/helpers/loadUserToken";

const { Dragger } = Upload

const UpdateProductImageModal = ({
  addImageModalOpen,
  setAddImageModalOpen,
  parentLoadData,
}) => {
  const [tableData, setTableData] = useState();
  const [step, setStep] = useState("/");
  const [currentRow, setCurrentRow] = useState({});
  const [isUploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [userToken, setUserToken] = useState('')

  const router = useRouter();

  const loadTableData = async () => {
    setTableData(await loadDirData("/"));
  };

  const props = {
    name: "myFile",
    data: {
      root: `${step}`,
    },
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
    showUploadList: false,
    multiple: false,
    action: `${process.env.NEXT_PUBLIC_UPLOAD_HOST}/upload`,
    async onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        setUploading(false);
        setUploadProgress(0);
      }

      if (status === "uploading") {
        setUploading(true);
        setUploadProgress(parseInt((info.file.percent || 0).toFixed(0), 10));
      }

      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
        setUploading(false);
        setUploadProgress(0);
        setTableData(await loadDirData(step));
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  const handleOk = async (e) => {
    parentLoadData(currentRow[0].info.path);
    setAddImageModalOpen(false);
  };

  useEffect(() => {
    loadTableData();
    setUserToken(loadUserToken())
  }, []);

  return (
    <>
      <Modal
        width={800}
        title="Add Image Modal"
        open={addImageModalOpen}
        onOk={handleOk}
        onCancel={(e) => setAddImageModalOpen(false)}
      >
        <Breadcrumb
          items={genBreadcrumbItems(step, setTableData, step, setStep)}
        />
        <Table
          rowSelection={{
            type: "radio",
            onChange: (selectedRowKeys, selectedRows) => {
              setCurrentRow(selectedRows);
            },
            getCheckboxProps: (record) => ({
              disabled: record.info.isDirectory,
            }),
          }}
          columns={genTableColumns(tableData, setTableData, step, setStep)}
          dataSource={tableData}
          pagination={false}
        />
        <Divider />
        <Dragger {...props}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
          <p className="ant-upload-hint">
            Support for a single or bulk upload. Strictly prohibited from
            uploading company data or other banned files.
          </p>
        </Dragger>
        {isUploading && <Progress percent={uploadProgress} />}
      </Modal>
    </>
  );
};

export default UpdateProductImageModal;

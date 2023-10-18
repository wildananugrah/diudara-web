import { InboxOutlined } from "@ant-design/icons";
import { Divider, Modal, Progress, Upload, message } from "antd";
import { useEffect, useState } from "react";
import loadUserToken from "../../helpers/loadUserToken";
import { useRouter } from "next/router";
import loadDirData from "../helpers/loadDirData";
const { Dragger } = Upload;

const FilesUploadFileModal = ({
  isUploadFileModalOpen,
  setUploadFileModalOpen,
  setTableData
}) => {
  const [isUploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [userToken, setUserToken] = useState("")

  const router = useRouter()

  const props = {
    name: "myFile",
    data: {
      root: `${router.query.p !== undefined ? router.query.p : ""}`,
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
        setUploadFileModalOpen(false);
        setUploading(false);
        setUploadProgress(0);
        setTableData(await loadDirData(router.query.p));
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  useEffect(() => {
    setUserToken(loadUserToken())
  },[])

  return (
    <>
      <Modal
        title="Add new item"
        open={isUploadFileModalOpen}
        onOk={() => setUploadFileModalOpen(false)}
        onCancel={() => setUploadFileModalOpen(false)}
      >
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

export default FilesUploadFileModal;

import { Button, Form, Image, Progress, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import loadUserToken from "@/src/helpers/loadUserToken";
import { useRouter } from "next/router";

const UpdateProductPicture = ({ productImage, setProductImage }) => {
  const [isUploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [userToken, setUserToken] = useState("");
  const router = useRouter();

  const props = {
    name: "myFile",
    data: {
      root: `${router.query.id}`,
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
        setProductImage(info.file.name);
        setUploading(false);
        setUploadProgress(0);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  useEffect(() => {
    setUserToken(loadUserToken());
  }, []);

  return (
    <Form layout="vertical">
      <Form.Item label="Product Image">
        <Upload {...props}>
          <Button icon={<UploadOutlined />}>Upload</Button>
        </Upload>
        {isUploading && <Progress percent={uploadProgress} />}
      </Form.Item>
      {router.query.id !== undefined && productImage !== "" && (
        <Image
          src={`${process.env.NEXT_PUBLIC_UPLOAD_HOST}/file?p=${router.query.id}/${productImage}&token=${userToken}`}
        ></Image>
      )}
    </Form>
  );
};

export default UpdateProductPicture;

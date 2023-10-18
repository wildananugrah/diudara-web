import {
  Breadcrumb,
  Divider,
  Image,
  Modal,
  Row,
  Space,
  Table,
  Typography,
  message,
} from "antd";
import AppAdminLayout from "../helpers/layout/AppAdminLayout";
import genCollectedItemDetailColumn from "./helpers/genCollectedItemDetailColumn";
import { useEffect, useRef, useState } from "react";
import loadUserToken from "../helpers/loadUserToken";
import { useRouter } from "next/router";
import { getFileType } from "../helpers/fileTypeValidator";
import Link from "next/link";

const CollectedItemDetail = () => {
  const [data, setData] = useState([]);
  const [userToken, setUserToken] = useState(loadUserToken());
  const [modal, setModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const router = useRouter();
  const videoRef = useRef();

  const onLoadData = async (id) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BE_HOST}/userProducts/detail/${id}`
    );
    if (!response.ok) {
      message.error("Error fetching collected detail items");
    } else {
      const responseJson = await response.json();
      setData(responseJson.data);
    }
  };

  useEffect(() => {
    onLoadData(router.query.id);
  }, [router.query.id]);

  return (
    <AppAdminLayout>
      <Typography.Title level={3}>Collected Item Detail</Typography.Title>
      <Divider />
      <Space direction="vertical" style={{ width: '100%' }}>
        <Breadcrumb
          items={[
            {
              title: <Link href="/admin/collected-items">Collected Items</Link>,
            },
            {
              title: "Detail",
            },
          ]}
        />
        <Table
          columns={genCollectedItemDetailColumn({
            modal,
            setModal,
            setSelectedItem,
          })}
          dataSource={data}
        />
      </Space>
      <Modal open={modal} onCancel={() => setModal(false)}>
        {selectedItem.path !== undefined && selectedItem.path}
        {selectedItem.path !== undefined &&
          getFileType(selectedItem.path) === "image" && (
            <Row justify="center" align="middle" style={{ height: "100vh" }}>
              <Image
                src={`${process.env.NEXT_PUBLIC_UPLOAD_HOST}/collected/file?p=${selectedItem.path}&productId=${selectedItem.productId}&type=image`}
                alt="icons"
              />
            </Row>
          )}
        {selectedItem.path !== undefined &&
          getFileType(selectedItem.path) === "video" && (
            <video
              ref={videoRef}
              style={{ width: "100%" }}
              src={`${process.env.NEXT_PUBLIC_UPLOAD_HOST}/collected/file?p=${selectedItem.path}&productId=${selectedItem.productId}&&type=video`}
              width="1080px"
              autoPlay
              playsInline
              controls
            />
          )}
      </Modal>
    </AppAdminLayout>
  );
};

export default CollectedItemDetail;

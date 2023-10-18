import { Divider, Image, Modal, Row } from "antd";
import { useRef } from "react";
import loadUserToken from "../../helpers/loadUserToken";
import { getFileType } from "@/src/helpers/fileTypeValidator";

const FilesDetailItemModal = ({
  isDetailFileOpen,
  setDetailFileOpen,
  detailItem,
}) => {
  const videoRef = useRef();

  const closeModal = () => {
    if (videoRef.current !== null && videoRef.current !== undefined) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    setDetailFileOpen(false);
  };

  return (
    <Modal
      title={detailItem.name !== undefined && detailItem.name}
      open={isDetailFileOpen}
      onOk={() => {
        closeModal();
      }}
      onCancel={() => {
        closeModal();
      }}
      width={1200}
    >
      <Divider />
      {detailItem.name !== undefined &&
        getFileType(detailItem.name) === "image" && (
          <Row justify="center" align="middle" style={{ height: "100vh" }}>
            <Image
              src={`${process.env.NEXT_PUBLIC_UPLOAD_HOST}/file?p=${
                detailItem.path
              }&token=${loadUserToken()}`}
              alt="icons"
            />
          </Row>
        )}
      {detailItem.name !== undefined &&
        getFileType(detailItem.name) === "video" && (
          <video
            ref={videoRef}
            style={{ width: "100%" }}
            src={`${process.env.NEXT_PUBLIC_UPLOAD_HOST}/file?p=${
              detailItem.path
            }&token=${loadUserToken()}`}
            width="1080px"
            autoPlay
            playsInline
            controls
          ></video>
        )}
    </Modal>
  );
};

export default FilesDetailItemModal;

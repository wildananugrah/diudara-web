import { Image, Space } from "antd";
import Link from "next/link";
import FilesDetailItemModal from "./FilesDetailItemModal";
import { useState } from "react";
import { useRouter } from "next/router";
import loadDirData from "../helpers/loadDirData";

const FilesTableItem = ({ item, tableData, setTableData }) => {
  const [isDetailFileOpen, setDetailFileOpen] = useState(false);
  const [detailItem, setDetailItem] = useState({});
  const router = useRouter();

  return (
    <>
      <Space>
        <Image width={25} src={item.image} />
        <Link
          href={
            item.isDirectory
              ? `?p=${item.path}`
              : router.query.p !== undefined
              ? `?p=${router.query.p}`
              : ""
          }
          onClick={async (e) => {
            if (item.isDirectory) {
              setTableData(
                await loadDirData(e.target.attributes.href.value.split("=")[1])
              );
              return
            }

            setDetailItem(item);
            setDetailFileOpen(true);
          }}
        >
          {item.name}
        </Link>
      </Space>

      <FilesDetailItemModal
        isDetailFileOpen={isDetailFileOpen}
        setDetailFileOpen={setDetailFileOpen}
        detailItem={detailItem}
      />
    </>
  );
};

export default FilesTableItem;

import { Button, Divider, Space, Table, message } from "antd";
import { useEffect, useState } from "react";
import UpdateProductAddItemModal from "./UpdateProductAddItemModal";
import { useRouter } from "next/router";
import loadUserToken from "@/src/helpers/loadUserToken";
import genProductItemTableColumns from "../helpers/genProductItemTableColumns";

const UpdateProductTable = () => {
  const [tableData, setTableData] = useState();
  const [addItemModalOpen, setAddItemModalOpen] = useState(false);
  const router = useRouter();

  const loadData = async () => {
    const response = await fetch(
      `${[process.env.NEXT_PUBLIC_BE_HOST]}/product-items/${router.query.id}`,
      {
        headers: {
          Authorization: `Bearer ${loadUserToken()}`,
        },
        method: "GET",
      }
    );

    if (!response.ok) {
      // message.error(`${response.status} - failed to load data.`);
      return;
    }

    const responseJson = await response.json();

    const transformedData = responseJson.data.map((entry, index) => ({
      key: index.toString(),
      info: {
        id: entry.id,
        productId: entry.productId,
        image: entry.path.endsWith(".mp4")
          ? "/images/play.png"
          : "/images/image.png",
        path: entry.path,
        name: entry.path.split("/").pop(),
      },
    }));

    setTableData(transformedData);
  };

  useEffect(() => {
    loadData();
  }, [router.query.id]);

  return (
    <>
      <Space direction="vertical" style={{ width: "100%" }}>
        <Table
          columns={genProductItemTableColumns(loadData)}
          dataSource={tableData}
          pagination={false}
        />
        <Space direction="hortizontal" style={{ width: "100%" }}>
          <Button onClick={(e) => setAddItemModalOpen(true)} type="primary">
            Add Item
          </Button>
          <Button onClick={(e) => e.preventDefault()}>Share</Button>
        </Space>
      </Space>
      <UpdateProductAddItemModal
        addItemModalOpen={addItemModalOpen}
        setAddItemModalOpen={setAddItemModalOpen}
        parentLoadData={loadData}
      />
    </>
  );
};

export default UpdateProductTable;

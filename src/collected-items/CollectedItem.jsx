import { Divider, Table, Typography, message } from "antd";
import AppAdminLayout from "../helpers/layout/AppAdminLayout";
import genCollectedItemColumn from "./helpers/genCollectedItemColumn";
import { useEffect, useState } from "react";
import loadUserToken from "../helpers/loadUserToken";

const CollectedItem = () => {
  const [userToken, setUserToken] = useState(loadUserToken());
  const [userCollectedProducts, setUserCollectedProducts] = useState([]);

  const loadUserCollectedProduct = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BE_HOST}/userProducts`, {
      headers: { Authorization: `Bearer ${userToken}` },
    });

    if (!response.ok) {
      message.error("Can not load user collected product.");
    } else {
      const responseJson = await response.json();
      setUserCollectedProducts(responseJson.data.map((item, index) => ({
        id: item.id,
        productName: item.product.name,
        productId: item.productId,
      })))
    }
  };

  useEffect(() => {
    loadUserCollectedProduct();
  }, []);

  return (
    <AppAdminLayout>
      <Typography.Title level={3}>Collected Items</Typography.Title>
      <Divider />
      <Table
        columns={genCollectedItemColumn({ userToken: userToken, loadData: loadUserCollectedProduct })}
        dataSource={userCollectedProducts}
      />
    </AppAdminLayout>
  );
};

export default CollectedItem;

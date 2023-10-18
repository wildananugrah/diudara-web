import AppAdminLayout from "@/src/helpers/layout/AppAdminLayout";
import { Button, Col, Divider, Row, Typography } from "antd";
import ProductTable from "./components/ProductTable";
import { useState } from "react";
import ProductAddItemModal from "./components/ProductAddItemModal";
const { Title } = Typography;

const Product = () => {
  const [tableData, setTableData] = useState([]);
  const [isAddProductModal, setAddProductModal] = useState(false);

  return (
    <>
      <AppAdminLayout>
        <Title level={3}>Product</Title>
        <Row>
          <Col>
            <Button type="primary" onClick={() => setAddProductModal(true)}>Create a Product</Button>
          </Col>
        </Row>
        <Divider />
        <ProductTable tableData={tableData} setTableData={setTableData} />

        <ProductAddItemModal
          tableData={tableData}
          setTableData={setTableData}
          isAddProductModal={isAddProductModal}
          setAddProductModal={setAddProductModal}
        />
      </AppAdminLayout>
    </>
  );
};

export default Product;

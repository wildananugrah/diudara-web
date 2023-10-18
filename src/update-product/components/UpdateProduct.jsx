import AppAdminLayout from "@/src/helpers/layout/AppAdminLayout";
import { Breadcrumb, Divider, Space, Typography } from "antd";
import UpdateProductForm from "./UpdateProductForm";
import UpdateProductTable from "./UpdateProductTable";
import { useRouter } from "next/router";
import Link from "next/link";

const UpdateProduct = () => {

  const router = useRouter()

  return (
    <>
      <AppAdminLayout>
        <Typography.Title level={3}>Update Product</Typography.Title>
        <Divider />
        <Space direction="vertical" style={{ width: '100%'}}>
          <Breadcrumb
            items={[
              {
                title: <Link href="/admin/products">Products</Link>,
              },
              {
                title: "Update Product",
              },
            ]}
          />
          <UpdateProductForm />
          <Divider />
          <UpdateProductTable />
        </Space>
      </AppAdminLayout>
    </>
  );
};

export default UpdateProduct;

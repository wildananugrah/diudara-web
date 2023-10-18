import loadUserToken from "@/src/helpers/loadUserToken";
import { Button, Form, Input, Modal, Space, message } from "antd";
import { useRouter } from "next/router";
import loadProductData from "../helpers/loadProductData";

const ProductAddItemModal = ({
  tableData,
  setTableData,
  isAddProductModal,
  setAddProductModal,
}) => {

  const router = useRouter()

  const onAddProductFinish = async ({ name, description }) => {
    
    const response = await fetch(`${process.env.NEXT_PUBLIC_BE_HOST}/products`, {
      headers: {
        "Authorization": `Bearer ${loadUserToken()}`,
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({ name, description })
    })

    if(!response.ok) message.error(`${response.status} Adding new product failed.`);
    else {
      const responseJson = await response.json();
      loadProductData(setTableData)
      setAddProductModal(false)
    }
  }

  return (
    <>
      <Modal
        title="Add New Product Item"
        open={isAddProductModal}
        footer={false}
      >
        <Form 
          layout={"vertical"}
          onFinish={onAddProductFinish}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input your product's name!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[
              {
                required: true,
                message: "Please input your product's name!",
              },
            ]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item>
            <Space direction="horizontal">
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  setAddProductModal(false);
                }}
              >
                Cancel
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ProductAddItemModal;

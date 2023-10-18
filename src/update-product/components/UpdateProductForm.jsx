import loadUserToken from "@/src/helpers/loadUserToken";
import {
  Button,
  Divider,
  Form,
  Image,
  Input,
  Modal,
  Space,
  Switch,
  message,
} from "antd";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import UpdateProductImageModal from "./UpdateProductImageModal";

const UpdateProductForm = () => {
  const [form] = Form.useForm();
  const [productStatus, setProductStatus] = useState(false);
  const [addImageModalOpen, setAddImageModalOpen] = useState(false);
  const [productTokenModal, setProductTokenModal] = useState(false);
  const [productImage, setProductImage] = useState("");
  const [productToken, setProductToken] = useState("");

  const router = useRouter();

  const handleShare = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BE_HOST}/products/token/${router.query.id}`,
      {
        headers: {
          Authorization: `Bearer ${loadUserToken()}`,
          "Content-Type": "application/json",
        },
      }
    );

    const responseJson = await response.json();
    setProductTokenModal(true);
    setProductToken(responseJson.url);
  };

  const handleFinish = async ({ name, description }) => {
    const response = await fetch(
      `${[process.env.NEXT_PUBLIC_BE_HOST]}/products/${router.query.id}`,
      {
        headers: {
          Authorization: `Bearer ${loadUserToken()}`,
          "Content-Type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify({
          name,
          description,
          status: productStatus,
          image: productImage,
        }),
      }
    );
    if (!response.ok)
      message.error(`${response.status} updating product data failed.`);
    else {
      message.success("Product data has been updated successfully.");
    }
  };

  const loadProductData = async (id) => {
    if (id === undefined) return;

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BE_HOST}/products/${id}`,
      {
        headers: {
          Authorization: `Bearer ${loadUserToken()}`,
        },
        method: "GET",
      }
    );
    if (!response.ok)
      message.error(`${response.status} getting product data failed.`);
    else {
      const responseJson = await response.json();
      form.setFieldsValue(responseJson.data);
      setProductStatus(responseJson.data.status);
      setProductImage(responseJson.data.image);
    }
  };

  useEffect(() => {
    loadProductData(router.query.id);
  }, [router.query]);

  return (
    <>
      <Form layout={"vertical"} form={form} onFinish={handleFinish}>
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
        <Form.Item label="Status" name="status">
          <Switch onChange={setProductStatus} checked={productStatus} />
        </Form.Item>
        <Form.Item label="Image" name="image">
          <Space direction="vertical">
            <Button onClick={(e) => setAddImageModalOpen(true)}>
              Update Image
            </Button>
            {router.query.id !== undefined && productImage !== "" && (
              <Image
                width={300}
                src={`${
                  process.env.NEXT_PUBLIC_UPLOAD_HOST
                }/file?p=${productImage}&token=${loadUserToken()}`}
              ></Image>
            )}
          </Space>
          <UpdateProductImageModal
            addImageModalOpen={addImageModalOpen}
            setAddImageModalOpen={setAddImageModalOpen}
            parentLoadData={setProductImage}
          />
        </Form.Item>
        <Form.Item>
          <Space direction="horizontal">
            <Button type="primary" htmlType="submit">
              Update
            </Button>
            <Button
              onClick={(e) => {
                e.preventDefault();
                handleShare();
              }}
            >
              Share
            </Button>
          </Space>
        </Form.Item>
      </Form>
      <Modal
        open={productTokenModal}
        onCancel={() => setProductTokenModal(false)}
        onOk={() => setProductTokenModal(false)}
        title="Product Token"
      >
        <div style={{ margin: 10 }}>{productToken}</div>
      </Modal>
    </>
  );
};

export default UpdateProductForm;

import { Button, Divider, Form, Input, Space, Typography, message } from "antd";
import AppAdminLayout from "../helpers/layout/AppAdminLayout";
import loadUserToken from "../helpers/loadUserToken";
import { useEffect } from "react";

const Setting = () => {
  const [form] = Form.useForm();

  const handleFinish = async ({ email, name, username }) => {
    console.log(`email: ${email} name: ${name} username: ${username}`);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BE_HOST}/user-profile`,
      {
        headers: {
          Authorization: `Bearer ${loadUserToken()}`,
          "Content-Type": "application/json"
        },
        method: "PUT",
        body: JSON.stringify({ username, email, name }),
      }
    );

    if (!response.ok)
      message.error(`${response.status} failed to update user profile`);
    else {
      message.success("User profile has been updated successfully");
    }
  };

  const loadUserData = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BE_HOST}/user-profile`,
      {
        headers: {
          Authorization: `Bearer ${loadUserToken()}`,
        },
        method: "GET",
      }
    );

    if (!response.ok)
      message.error(`${response.status} failed to load user profile`);
    else {
      const responseJson = await response.json();
      form.setFieldsValue(responseJson.data);
    }
  };

  useEffect(() => {
    loadUserData();
  }, []);

  return (
    <>
      <AppAdminLayout>
        <Typography.Title level={3}>Setting</Typography.Title>
        <Divider />
        <Form layout={"vertical"} form={form} onFinish={handleFinish}>
          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input your name!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Space direction="horizontal">
              <Button type="primary" htmlType="submit">
                Update
              </Button>
              <Button
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
                Cancel
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </AppAdminLayout>
    </>
  );
};

export default Setting;

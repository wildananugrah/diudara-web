import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";
import { Button, Col, Form, Input, Row, Space, message } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";

const RegisterForm = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const router = useRouter();

  const registerWithGmail = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      console.log(codeResponse);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BE_HOST}/users/gmail`,
        {
          headers: {
            Authorization: `Bearer ${codeResponse.access_token}`,
          },
          method: "POST",
        }
      );

      if (!response.ok)
        messageApi.open({ type: "error", message: response.status });

      messageApi.open({
        type: "info",
        content: `Successfully registered`,
      });

      router.push("/login");
    },
  });

  const onFinish = async ({ email, password, name }) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_USER_HOST}/users`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ email, password, name }),
    });

    if (!response.ok)
      messageApi.open({ type: "error", message: response.status });

    messageApi.open({
      type: "info",
      content: `Successfully registered`,
    });

    router.push("/login");
  };

  const onFinishFailed = () => {};

  return (
    <Form
      labelCol={{
        span: 6,
      }}
      wrapperCol={{
        span: 16,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      {contextHolder}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: 100,
        }}
      >
        <h1>Logo</h1>
      </div>
      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            type: "email",
            message: "Please input your email!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        label="Name"
        name="name"
        rules={[
          {
            required: true,
            type: "text",
            message: "Please input your name!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Link href="/login">Already have an account ?</Link>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Space direction="horizontal">
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Button onClick={() => registerWithGmail()}>
            Regiter with Google
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

const app = () => {
  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
      <div>
        <Row>
          <Col span={6} offset={9}>
            <div
              style={{
                marginTop: 200,
                boxShadow: "5px 5px 10px #CCC",
                padding: 10,
                borderRadius: 10,
              }}
            >
              <RegisterForm />
            </div>
          </Col>
        </Row>
      </div>
    </GoogleOAuthProvider>
  );
};

export default app;

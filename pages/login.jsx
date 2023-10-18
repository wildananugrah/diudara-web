import { Button, Checkbox, Col, Form, Input, Row, Space, message } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import Cookies from "universal-cookie";
import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";

const LoginForm = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const router = useRouter();

  const loginWithGmail = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      console.log(codeResponse);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BE_HOST}/users/auth/gmail`,
        {
          headers: {
            Authorization: `Bearer ${codeResponse.access_token}`,
          },
        }
      );

      if (!response.ok) {
        messageApi.open({
          type: "error",
          content: response.status,
        });
        return;
      }

      messageApi.open({
        type: "info",
        content: `Successfully logged in`,
      });

      const cookies = new Cookies();
      cookies.set("token", JSON.stringify(await response.json()));
      router.push("/admin/dashboard");
    },
  });

  const onFinish = async ({ email, password, remember }) => {
    // TODO: handle fetch to validate username and password

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BE_HOST}/users/auth`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ email, password }),
      }
    );

    if (!response.ok) {
      messageApi.open({
        type: "error",
        content: response.status,
      });
      return;
    }

    messageApi.open({
      type: "info",
      content: `Successfully logged in`,
    });

    const cookies = new Cookies();
    cookies.set("token", JSON.stringify(await response.json()));
    router.push("/admin/dashboard");
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
        name="remember"
        valuePropName="checked"
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Link href="/register">Don't have an account ?</Link>
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
          <Button onClick={() => loginWithGmail()}>Sign in with Google</Button>
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
              <LoginForm />
            </div>
          </Col>
        </Row>
      </div>
    </GoogleOAuthProvider>
  );
};

export default app;

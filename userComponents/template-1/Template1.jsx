import { Button, Row, Col, Typography, Card, message, Space } from "antd";
import { useEffect, useState } from "react";
import Link from "next/link";
import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";
import Cookies from "universal-cookie";
import { useRouter } from "next/router";
import loadUserToken from "@/src/helpers/loadUserToken";

const LandingPage = ({ username, userToken }) => {
  const { Title, Text, Paragraph } = Typography;

  const [products, setProducts] = useState([]);
  const router = useRouter();

  const loadProductData = async (username) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BE_HOST}/userProducts/${username}`
    );
    if (!response.ok)
      message.error(`${response.status} failed to load product data`);
    else {
      const responseJson = await response.json();
      setProducts(responseJson.data);
    }
  };

  const generateLink = (productItems) => {
    const filePaths = productItems
      .map((item) => `files=${encodeURIComponent(item.path)}`)
      .join("&");
    return `${process.env.NEXT_PUBLIC_UPLOAD_HOST}/user/download?${filePaths}&username=${username}`;
  };

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
        message.error(`${response.status} error login`);
        return;
      }

      message.info("Successfully logged in");

      const cookies = new Cookies();
      cookies.set("token", JSON.stringify(await response.json()));
      router.reload();
    },
  });

  const collectTheItem = async ({ productId }) => {
    
    if(userToken === undefined) {
      message.error("You have to login first")
      return
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BE_HOST}/userProducts`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        method: "POST",
        body: JSON.stringify({ productId }),
      }
    );

    if (!response.ok) message.error("Failed to collect the product");
    else {
      message.success("Successfully collect the product");
    }
  };

  useEffect(() => {
    loadProductData(username);
  }, []);

  return (
    <div style={{ padding: "50px" }}>
      {/* Header */}
      <Row justify="space-between" align="middle">
        <Col>
          <Title level={2} style={{ margin: 0 }}>
            Your Brand
          </Title>
        </Col>
        <Col>
          <Space direction="horizontal">
            {userToken === undefined ? (
              <Button onClick={(e) => loginWithGmail()}>
                Sign In with Gmail
              </Button>
            ) : (
              <Button onClick={(e) => router.push("/logout")}>Logout</Button>
            )}
          </Space>
        </Col>
      </Row>

      {/* Hero Section */}
      <Row style={{ marginTop: "100px" }} align="middle" gutter={[16, 16]}>
        <Col span={12}>
          <Title>Introducing Our Digital Product</Title>
          <Text>Discover the best solution for your needs.</Text>
          <div style={{ marginTop: "20px" }}>
            <Button type="primary" size="large">
              Learn More
            </Button>
          </div>
        </Col>
        <Col span={12}>
          <img
            src="/images/template1/digital-product.jpg"
            alt="Product Image"
            width="100%"
          />
        </Col>
      </Row>

      {/* product */}
      <Row style={{ marginTop: "100px" }} gutter={[32, 32]}>
        {products.length > 0 &&
          products.map((product) => (
            <Col span={8}>
              <Card>
                <Title level={3}>{product.name}</Title>
                <Paragraph>{product.description}</Paragraph>
                <Button>
                  <Link
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();

                      userToken === undefined
                        ? message.error("You have to login!")
                        : collectTheItem({ productId: product.id });
                    }}
                  >
                    Collect the Product
                  </Link>
                </Button>
              </Card>
            </Col>
          ))}
      </Row>

      {/* Footer */}
      <Row
        style={{
          marginTop: "100px",
          borderTop: "1px solid #ddd",
          paddingTop: "20px",
        }}
        justify="center"
      >
        <Text>&copy; 2023 Your Brand. All rights reserved.</Text>
      </Row>
    </div>
  );
};

export default function Template1({ username }) {
  const [userToken, setUserToken] = useState(undefined);

  const checkLogin = () => {
    setUserToken(loadUserToken());
  };

  useEffect(() => {
    checkLogin();
  }, []);

  return (
    <>
      <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
        <LandingPage username={username} userToken={userToken} />
      </GoogleOAuthProvider>
    </>
  );
}

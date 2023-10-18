import { Button, Row, Col, Typography, Input } from "antd";

export default function Template4() {
  const { Title, Text } = Typography;

  return (
    <div>
      <Row gutter={[16, 16]} style={{ marginTop: "100px" }}>
        <Col span={12}>
          <Title>Subscribe to Our Service</Title>
          <Text>Get the best features with our premium subscription.</Text>
          <Input placeholder="Enter your email" style={{ marginTop: "20px" }} />
          <Button type="primary" style={{ marginTop: "10px" }}>
            Subscribe Now
          </Button>
        </Col>
        <Col span={12}>
          <img
            src="/images/template4/subscription.jpg"
            alt="Subscription Service"
            width="100%"
          />
        </Col>
      </Row>
    </div>
  );
}

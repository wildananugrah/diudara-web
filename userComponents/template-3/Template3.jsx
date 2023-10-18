import { Button, Row, Col, Typography } from "antd";

export default function Template3() {
  const { Title, Text } = Typography;

  return (
    <div>
      <Row gutter={[16, 16]} style={{ marginTop: "100px" }}>
        <Col span={12}>
          <Title>Discover Our App</Title>
          <Text>Key features and benefits of our application.</Text>
          <Button type="primary">Download Now</Button>
        </Col>
        <Col span={12}>
          <img src="/images/template3/product1.jpg" alt="App Screenshot" width="100%" />
        </Col>
      </Row>
    </div>
  );
}

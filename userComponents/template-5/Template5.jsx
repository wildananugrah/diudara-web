import { Button, Row, Col, Typography, Avatar } from "antd";

export default function Template5() {
  const { Title, Text } = Typography;

  return (
    <div style={{
        padding: 20
    }}>
      <Row gutter={[16, 16]} style={{ marginTop: "100px" }}>
        <Col span={12}>
          <Title>Join Our Community</Title>
          <Text>Engage, discuss, and learn with our online community.</Text>
          <Button type="primary" style={{ marginTop: "20px" }}>
            Join Now
          </Button>
        </Col>
        <Col span={12}>
          <img src="/images/template5/community.jpg" alt="Community" width="100%" />
        </Col>
      </Row>
    </div>
  );
}

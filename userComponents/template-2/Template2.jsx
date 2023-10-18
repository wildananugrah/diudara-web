import { Row, Col, Typography, Carousel } from "antd";

export default function Template2() {
  const { Title, Text } = Typography;

  return (
    <div>
      <Row style={{ marginTop: "100px" }}>
        <Col span={24} style={{ textAlign: "center" }}>
          <Title>My Works</Title>
          <Text>Here are some of my best projects.</Text>
          <Carousel>
            <div>
              <img src="/images/template2/project1.jpg" alt="Project 1" width="100%" height={700} />
            </div>
            <div>
              <img src="/images/template2/project2.jpg" alt="Project 2" width="100%" height={700} />
            </div>
            <div>
              <img src="/images/template2/project3.jpg" alt="Project 3" width="100%" height={700} />
            </div>
            <div>
              <img src="/images/template2/project4.jpg" alt="Project 4" width="100%" height={700} />
            </div>
            <div>
              <img src="/images/template2/project5.jpg" alt="Project 5" width="100%" height={700} />
            </div>
          </Carousel>
        </Col>
      </Row>
    </div>
  );
}

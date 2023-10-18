import { Button, Card, Col, Row, Tag, message } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
import loadUserToken from "@/src/helpers/loadUserToken";

const TemplatesItem = ({ item, loadTemplates }) => {
  const handleActivate = async (e, templateId) => {
    e.preventDefault()
    const response = await fetch(`${process.env.NEXT_PUBLIC_BE_HOST}/user-template`, {
      headers: {
        "Authorization":  `Bearer ${loadUserToken()}`,
        "Content-Type": "application/json"
      },
      method: "PUT",
      body: JSON.stringify({ templateId })
    })

    if(!response.ok) message.error(`${response.status} failed to update template`)
    else {
      message.success('Template updated successfully')
      loadTemplates()
    }

  };

  return (
    <Row gutter={16} style={{ marginBottom: 20 }}>
      {item.map((_item, index) => (
        <Col span={8}>
          <Card title={_item.name} bordered={true}>
            {_item.active === 1 && (
              <Tag icon={<CheckCircleOutlined />} color="success">
                success
              </Tag>
            )}
            {_item.active === 0 && (
              <Button onClick={e => handleActivate(e, _item.id)}>Activate</Button>
            )}
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default TemplatesItem;

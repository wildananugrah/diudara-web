import AppAdminLayout from "@/src/helpers/layout/AppAdminLayout";
import { Breadcrumb, Col, Divider, Row, Space, Typography } from "antd";
import FilesDropdownMainMenu from "./components/FilesDropdownMainMenu";
import { useRouter } from "next/router";
import genBreadcrumbItems from "./helpers/genBreadcrumbItems";
import { useState } from "react";
import FilesTable from "./components/FilesTable";
const { Title } = Typography;

const Files = () => {
  const router = new useRouter();
  const [tableData, setTableData] = useState([]);

  return (
    <AppAdminLayout>
      <Title level={3}>Files</Title>
      <Row>
        <Col>
          <FilesDropdownMainMenu
            tableData={tableData}
            setTableData={setTableData}
          />
        </Col>
      </Row>
      <Divider></Divider>
      <Space direction="vertical" style={{ width: "100%" }}>
        {router.query.p !== undefined && (
          <Breadcrumb items={genBreadcrumbItems(router.query.p, setTableData)} />
        )}
        <FilesTable tableData={tableData} setTableData={setTableData} />
      </Space>
    </AppAdminLayout>
  );
};

export default Files;

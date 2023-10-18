import { Table } from "antd";
import { useEffect } from "react";
import loadProductData from "../helpers/loadProductData";

const ProductTable = ({ tableData, setTableData }) => {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
    },
  ];

  useEffect(() => {
    loadProductData(setTableData);
  }, []);

  return (
    <>
      <Table columns={columns} dataSource={tableData} pagination={false} />
    </>
  );
};

export default ProductTable;

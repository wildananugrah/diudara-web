import { Table } from "antd";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import loadUserToken from "../../helpers/loadUserToken";
import loadDirData from "../helpers/loadDirData";
import genTableColumns from "../helpers/tableColumns";

const FilesTable = ({ tableData, setTableData }) => {
  
  const [userToken, setUserToken] = useState("");
  const router = useRouter();

  const loadData = async () => {
    setTableData(await loadDirData(router.query.p));
  };

  useEffect(() => {
    setUserToken(loadUserToken());
  }, []);

  useEffect(() => {
    loadData();
  }, [userToken, router.isReady]);

  return (
    <>
      <Table columns={(genTableColumns(tableData, setTableData))} dataSource={tableData} pagination={false} />
    </>
  );
};

export default FilesTable;

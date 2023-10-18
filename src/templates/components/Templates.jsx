import { Divider, Input, Typography, message } from "antd";
import AppAdminLayout from "../../helpers/layout/AppAdminLayout";
import { useEffect, useState } from "react";
import groupBy from "../helpers/groupBy";
import TemplatesItem from "./TemplatesItem";
import loadUserToken from "@/src/helpers/loadUserToken";

const Templates = () => {
  const [templates, setTemplates] = useState([]);

  const onSearch = (value, _e, info) => {};

  const loadTemplates = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BE_HOST}/templates`,{
      headers: {
        "Authorization": `Bearer ${loadUserToken()}`
      }
    });
    if (!response.ok)
      message.error(`${response.status} failed to load Templates.`);
    else {
      const responseJson = await response.json();
      setTemplates(groupBy(responseJson.data, 3));
    }
  };

  useEffect(() => {
    loadTemplates();
  }, []);

  return (
    <>
      <AppAdminLayout>
        <Typography.Title level={3}>Templates</Typography.Title>
        <Divider />
        <Input.Search
          placeholder="input search text"
          allowClear
          onSearch={onSearch}
          style={{
            width: 200,
            marginBottom: 20,
          }}
        />
        {templates.length > 0 &&
          templates.map((item, index) => (
            <TemplatesItem item={item} loadTemplates={loadTemplates} />
          ))}
      </AppAdminLayout>
    </>
  );
};

export default Templates;

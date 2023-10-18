import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import templateMap from "./templateMap.js";
import { message } from "antd";
import DefaultTemplate from "@/userComponents/default/DefaultTemplate.jsx";

export default () => {
  const router = useRouter();
  const [template, setTemplate] = useState({});
  const [userToken, setUserToken] = useState(undefined);

  const loadTemplate = async (username) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BE_HOST}/${username}/template`
    );
    if (!response.ok)
      message.error(`${response.status} failed to load template`);
    else {
      const responseJson = await response.json();
      setTemplate(responseJson.data);
    }
  };

  useEffect(() => {
    router.query.username !== undefined && loadTemplate(router.query.username);
  }, [router.query.username]);

  const RenderedTemplate = templateMap[template.code];

  return (
    <>
      {RenderedTemplate !== undefined ? (
        <RenderedTemplate
          username={router.query.username}
        />
      ) : (
        <DefaultTemplate />
      )}
    </>
  );
};

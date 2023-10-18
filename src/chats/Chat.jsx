import { Divider, Typography } from "antd";
import AppAdminLayout from "../helpers/layout/AppAdminLayout";

const Chat = () => {
    return ( <AppAdminLayout>
        <Typography.Title level={3}>Chats</Typography.Title>
        <Divider />
    </AppAdminLayout> );
}
 
export default Chat;
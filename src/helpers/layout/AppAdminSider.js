import { Menu } from "antd";
import siderItems from "../siderItems";
import { useRouter } from 'next/router'

const AppAdminSider = () => {
    const router = useRouter()

    return (<Menu
        defaultSelectedKeys={router.pathname}
        mode="inline"
        items={siderItems}
    />);
}

export default AppAdminSider;
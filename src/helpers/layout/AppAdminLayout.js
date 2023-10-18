import { Layout } from "antd"
import AppAdminHeader from "./AppAdminHeader";
import AppAdminSider from "./AppAdminSider";
import { useEffect } from "react";
import Cookies from "universal-cookie";
import { useRouter } from "next/router";

const { Header, Content, Footer, Sider } = Layout

const AppAdminLayout = ({ children }) => {

    const router = useRouter()

    const validateToken = async () => {

        try {

            const cookies = new Cookies()
            const { token } = cookies.get('token')
            const response = await fetch(`${process.env.NEXT_PUBLIC_JWT_HOST}/validate`, {
                headers: {
                    "Content-Type": "application/json"
                },
                method: "POST",
                body: JSON.stringify({ token })
            })

            if (!response.ok) router.push("/login")

        } catch (err) {
            console.log(err)
            router.push("/login")
        }

    }

    useEffect(() => {

        validateToken()

    }, [])

    return (
        <Layout>
            <Header
                style={{
                    backgroundColor: "#FFF"
                }}
            >
                <AppAdminHeader />
            </Header>

            <Layout>
                <Sider
                    style={{
                        width: 256
                    }}
                >
                    <AppAdminSider />
                </Sider>
                <Layout>
                    <Content style={{ margin: 10, padding: 20, minHeight: 800, background: "#FFF" }}>
                        {children}
                    </Content>
                    <Footer>
                        Footer
                    </Footer>
                </Layout>
            </Layout>
        </Layout>
    );
}

export default AppAdminLayout;
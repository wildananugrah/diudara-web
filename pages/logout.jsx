import { useRouter } from "next/router";
import { useEffect } from "react";
import Cookies from "universal-cookie";

const Dashboard = () => {
    const router = useRouter()

    useEffect(() => {
        router.push("/login")
        new Cookies().remove("token")
    },[])

    return (
        <p>logout.....</p>    
    )
}

export default Dashboard;
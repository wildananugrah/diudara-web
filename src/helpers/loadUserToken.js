import Cookies from "universal-cookie";

const loadUserToken = () => {
    try {
        const cookies = new Cookies();
        const { token } = cookies.get('token')
        return token
    } catch (error) {
        return undefined
    }

}

export default loadUserToken
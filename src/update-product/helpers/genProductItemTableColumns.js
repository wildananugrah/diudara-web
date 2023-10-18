import loadUserToken from "@/src/helpers/loadUserToken";
import { Image, Space, message } from "antd";
import Link from "next/link";

const handleDelete = async (e, record, loadData) => {
    e.preventDefault();

    const response = await fetch(`${process.env.NEXT_PUBLIC_BE_HOST}/product-items/${record.info.productId}/${record.info.id}`, {
        headers: {
            "Authorization": `Bearer ${loadUserToken()}`
        },
        method: "DELETE"
    })
    
    if (!response.ok || response.status >= 400) {
        message.error(`${response.status} - failed to delete data.`);
        return;
    }

    message.success(`${record.info.name} deleted successfully`)
    loadData()

}

const genProductItemTableColumns = (loadData) => {

    return [
        {
            title: "Name",
            dataIndex: "info",
            key: "info",
            render: (item) => (
                <>
                    <Space direction="horizontal">
                        <Image width={25} src={item.image} />
                        <p style={{ color: '#000' }}>{item.name}</p>
                    </Space>
                </>
            ),
        },
        {
            title: "Action",
            key: "action",
            dataIndex: "id",
            render: (item, record) => (
                <>
                    <Space direction="horizontal">
                        <Link href="#" onClick={e => handleDelete(e, record, loadData)} style={{ color: "red" }}>Delete</Link>
                    </Space>
                </>
            ),
        },
    ];
}

export default genProductItemTableColumns
import { Space, message } from "antd";
import Link from "next/link";

const handleDelete = async (id, userToken, loadData) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BE_HOST}/userProducts/${id}`, {
        headers: {
            "Authorization": `Bearer ${userToken}`
        },
        method: "DELETE"
    })

    if (!response.ok) message.error('Can not delete product')
    else {
        message.success('Product deleted successfully')
        loadData()
    }
}

const genCollectedItemColumn = ({ userToken, loadData }) => {

    return [
        {
            title: "Product Name",
            dataIndex: "productName",
            key: "productName",
            render: (_, record) => (
                <>
                    <Space direction="horizontal">
                        <Link href={`/admin/collected-items/${record.id}`}>{record.productName}</Link>
                    </Space>
                </>
            ),
        },
        {
            title: "Action",
            key: "action",
            dataIndex: "id",
            render: (_, record) => (
                <>
                    <Space direction="horizontal">
                        <Link href={`/admin/collected-items/${record.id}`}>Details</Link>
                        <Link href="#" onClick={e => {
                            e.preventDefault()
                            handleDelete(record.id, userToken, loadData)
                        }} style={{ color: 'red' }}>Delete</Link>
                    </Space>
                </>
            ),
        },
    ];
}

export default genCollectedItemColumn
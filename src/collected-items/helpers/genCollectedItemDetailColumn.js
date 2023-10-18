import { Space, message } from "antd";
import Link from "next/link";

const sanitizeName = (name) => {
    return name.slice(1)
}

const genCollectedItemDetailColumn = ({ modal, setModal, setSelectedItem }) => {

    return [
        {
            title: "Name",
            dataIndex: "path",
            key: "path",
            render: (_, record) => (
                <>
                    <Space direction="horizontal">
                        <Link href={`#`} onClick={e => {
                            e.preventDefault()
                            setModal(true)
                            setSelectedItem(record)
                        }} style={{ color: 'black' }}>{sanitizeName(record.path)}</Link>
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
                        <Link href={`#`} onClick={e => {
                            e.preventDefault()
                            setModal(true)
                            setSelectedItem(record)
                        }}>Detail</Link>
                    </Space>
                </>
            ),
        },
    ];
}

export default genCollectedItemDetailColumn
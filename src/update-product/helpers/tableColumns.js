import loadDirData from "@/src/files/helpers/loadDirData";
import { Image, Space, message } from "antd";
import Link from "next/link";
import deleteFilesOrFolder from "./deleteFilesOrFolder";

const genTableColumns = (tableData, setTableData, step, setStep) => {



    return [
        {
            title: "Name",
            dataIndex: "info",
            key: "info",
            render: (item) => (
                <>
                    <Space direction="horizontal">
                        <Image width={25} src={item.image} />
                        {item.isDirectory ? <Link href="#" onClick={async e => {
                            e.preventDefault();
                            if (item.isDirectory) {
                                setStep(item.path)
                                setTableData(await loadDirData(item.path))
                            }
                        }}>{item.name}</Link> : <p style={{ color: '#000' }}>{item.name}</p>}
                    </Space>
                </>
            ),
        },
        {
            title: "Size",
            dataIndex: "size",
            key: "size",
        },
        {
            title: "Size",
            dataIndex: "size",
            key: "size",
            render: (item, record) => {
                return !record.info.isDirectory && <Space direction="vertical">
                    <Link href="#" onClick={async e => {
                        e.preventDefault()
                        const response = await deleteFilesOrFolder(record)

                        if (!response.ok) {
                            const responseJson = await response.json()
                            message.error(`${responseJson.message}`);
                            return;
                        }

                        message.success(`${record.info.name} deleted successfully`)

                        setTableData(await loadDirData(step))

                    }} style={{ color: "red" }}>Delete</Link>
                </Space>
            }
        }
        // {
        //     title: "Created At",
        //     dataIndex: "createdAt",
        //     key: "createdAt",
        // },
        // {
        //     title: "Action",
        //     key: "action",
        //     dataIndex: "id",
        //     render: (item, record) => (
        //         <GalleriesTableMoreActions
        //             item={item}
        //             record={record}
        //             tableData={tableData}
        //             setTableData={setTableData}
        //         />
        //     ),
        // },
    ];
}

export default genTableColumns
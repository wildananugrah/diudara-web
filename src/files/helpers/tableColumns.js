import FilesTableItem from "../components/FilesTableItem";
import FilesTableMoreActions from "../components/FilesTableMoreActions";

const genTableColumns = (tableData, setTableData) => {
    return [
        {
            title: "Name",
            dataIndex: "info",
            key: "info",
            render: (item) => (<FilesTableItem 
                tableData={tableData}
                setTableData={setTableData}
                item={item} />),
        },
        {
            title: "Size",
            dataIndex: "size",
            key: "size",
        },
        {
            title: "Created At",
            dataIndex: "createdAt",
            key: "createdAt",
        },
        {
            title: "Action",
            key: "action",
            dataIndex: "id",
            render: (item, record) => (
                <FilesTableMoreActions
                    item={item}
                    record={record}
                    tableData={tableData}
                    setTableData={setTableData}
                />
            ),
        },
    ];
}

export default genTableColumns
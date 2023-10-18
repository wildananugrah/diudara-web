const genTableColumns = () => {
    return [
        {
            title: "Name",
            dataIndex: "info",
            key: "info",
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
        },
    ];
}

export default genTableColumns
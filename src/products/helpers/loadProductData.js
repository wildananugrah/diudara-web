import loadUserToken from "@/src/helpers/loadUserToken";
import { Space, message } from "antd";
import Link from "next/link";

const handleDelete = async (e, id, setTableData) => {
    e.preventDefault();
    const response = await fetch(`${process.env.NEXT_PUBLIC_BE_HOST}/products/${id}`, {
        headers: {
            Authorization: `Bearer ${loadUserToken()}`,
            "Content-Type": "application/json",
        },
        method: "DELETE"
    });
    if (!response.ok) message.error(`${response.status}: fetching data failed`);
    else {
        message.success(`Data has been deleted successfully`)
        loadProductData(setTableData)
    }
};

const loadProductData = async (setTableData) => {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_BE_HOST}/products`,
        {
            headers: {
                Authorization: `Bearer ${loadUserToken()}`,
                "Content-Type": "application/json",
            },
            method: "GET",
        }
    );

    if (!response.ok) message.error(`${response.status}: fetching data failed`);
    else {
        const responseJson = await response.json();
        const transformedData = responseJson.data.map((item, index) => ({
            key: index.toString(),
            id: item.id,
            name: (
                <>
                    <Link href={`/admin/update-product?id=${item.id}`}>
                        {item.name}
                    </Link>
                </>
            ),
            description: item.description,
            status: item.status ? "active" : "inactive",
            action: (
                <>
                    <Space direction="horizontal">
                        <Link href={`/admin/update-product?id=${item.id}`}>Edit</Link>
                        <Link
                            href="#"
                            onClick={(e) => handleDelete(e, item.id, setTableData)}
                            style={{ color: "red" }}
                        >
                            Delete
                        </Link>
                    </Space>
                </>
            ),
        }));
        setTableData(transformedData);
    }
};

export default loadProductData
import Cookies from "universal-cookie";

const loadDirData = async (path = undefined) => {
    
    const userToken = new Cookies().get('token').token

    let url =
        path === undefined
            ? `${process.env.NEXT_PUBLIC_UPLOAD_HOST}/files`
            : `${process.env.NEXT_PUBLIC_UPLOAD_HOST}/files?root=${path}`;

    const response = await fetch(url, {
        headers: {
            Authorization: `Bearer ${userToken}`,
        },
        method: "GET",
    });

    if (!response.ok) return;

    const results = await response.json()

    const transformedData = results.map((entry, index) => ({
        key: index.toString(),
        info: {
            image: entry.isDirectory
                ? "/images/folder.png"
                : entry.item.endsWith(".mp4")   
                    ? "/images/play.png"
                    : "/images/image.png",
            path: entry.item,
            name: entry.item.split("/").pop(),
            isDirectory: entry.isDirectory,
        },
        size: entry.size,
        createdAt: entry.createdAt,
    }));

    return transformedData
}

export default loadDirData